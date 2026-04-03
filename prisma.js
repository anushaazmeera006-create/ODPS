generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Person {
  person_id    Int       @id @default(autoincrement()) @map("person_id")
  name        String
  age         Int
  gender      String?
  blood_group String     @map("blood_group")
  phone       String
  donor       Donor?
  recipient   Recipient?

  @@index([blood_group], map: "idx_blood_group")
  @@map("person")
}

model Donor {
  donor_id Int     @id @map("donor_id")
  status   String  @default("active")
  consent  Boolean
  person   Person  @relation(fields: [donor_id], references: [person_id], onDelete: Cascade)
  organs   Organ[]
  matches  MatchTable[]

  @@map("donor")
}

model Recipient {
  recipient_id  Int          @id @map("recipient_id")
  organ_needed  String?      @map("organ_needed")
  urgency_level Int          @map("urgency_level")
  waiting_time  Int          @default(0) @map("waiting_time")
  status        String       @default("waiting")
  person        Person       @relation(fields: [recipient_id], references: [person_id], onDelete: Cascade)
  requests     WaitingList[]
  matches      MatchTable[]

  @@map("recipient")
}

model Organ {
  organ_id             Int         @id @default(autoincrement()) @map("organ_id")
  donor_id             Int?        @map("donor_id")
  organ_type           String      @map("organ_type")
  availability_status  String      @default("available") @map("availability_status")
  expiry_time          DateTime?   @map("expiry_time")
  donor                Donor?      @relation(fields: [donor_id], references: [donor_id], onDelete: SetNull)
  matches       MatchTable[]

  @@index([organ_type], map: "idx_organ_type")
  @@map("organ")
}

model Hospital {
  hospital_id Int          @id @default(autoincrement()) @map("hospital_id")
  name        String
  location    String
  matches     MatchTable[]

  @@map("hospital")
}

model MatchTable {
  match_id      Int        @id @default(autoincrement()) @map("match_id")
  donor_id      Int        @map("donor_id")
  recipient_id  Int        @map("recipient_id")
  organ_id      Int        @map("organ_id")
  hospital_id   Int        @map("hospital_id")
  match_date    DateTime   @default(now()) @map("match_date")
  status        String?
  donor         Donor      @relation(fields: [donor_id], references: [donor_id], onDelete: Restrict)
  organ         Organ      @relation(fields: [organ_id], references: [organ_id], onDelete: Restrict)
  recipient     Recipient  @relation(fields: [recipient_id], references: [recipient_id], onDelete: Restrict)
  hospital      Hospital   @relation(fields: [hospital_id], references: [hospital_id], onDelete: Restrict)

  @@map("match_table")
}

model WaitingList {
  entry_id        Int       @id @default(autoincrement()) @map("entry_id")
  recipient_id   Int       @map("recipient_id")
  priority_score Float     @map("priority_score")
  rank_position  Int?      @map("rank_position")
  recipient      Recipient @relation(fields: [recipient_id], references: [recipient_id], onDelete: Cascade)

  @@map("waiting_list")
}

model AuditLog {
  log_id     Int      @id @default(autoincrement()) @map("log_id")
  action     String
  details    String?
  timestamp  DateTime @default(now()) @map("timestamp")

  @@map("audit_log")
}
