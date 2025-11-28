import { MemberEntity, ProfileEntity, ServerEntity } from "@repo/db"


export type ServerWithMembersWithProfile = ServerEntity & {
  members: (MemberEntity & {
    profile: ProfileEntity
  })[]
}