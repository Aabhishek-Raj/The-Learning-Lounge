'use client'

import { useEffect, useState } from 'react'
import { CreateChannelModal } from '@/components/modals/CreateChannelModal'
import { MembersModal } from '@/components/modals/MembersModal'
import { EditServerModal } from '@/components/modals/EditServerModal'
import { InviteModal } from '@/components/modals/InviteModal'
import { CreateModalServer } from '@/components/modals/CreateServerModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <>
      <CreateModalServer />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
    </>
  )
}
