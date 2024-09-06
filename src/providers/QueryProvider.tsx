'use client'

import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
const client=new QueryClient()
export default function QueryProvider({children}:{children:React.ReactNode}){
    return(
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools  initialIsOpen={false} />
        </QueryClientProvider>
    )
}