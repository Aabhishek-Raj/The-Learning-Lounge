'use client'

import { useModal } from '@/store/modalStore'
import { Plus } from 'lucide-react'
import { ToolTip } from '../actions/Tooltip'

export const NavigationAction = () => {
  const { onOpen } = useModal()

  return (
    <div className="group flex items-center">
      <ToolTip side="right" align="center" label="Add a Server">
        <button
          onClick={() => onOpen('createServer')}
          className="flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500"
        >
          <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
        </button>
      </ToolTip>
    </div>
  )
}
