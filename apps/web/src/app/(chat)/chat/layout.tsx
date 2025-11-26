import { NavigationSidebar } from '@/components/navigation/NavigationSidebar'
// import { QueryProvider } from '@/components/providers/query-provider'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //   <QueryProvider>
        <div className="h-full">
          <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 bg-[]">
            <NavigationSidebar />
          </div>
          <main className="md:pl-[72px] h-full">{children}</main>
        </div>
    //  </QueryProvider>
  )
}

export default ChatLayout
