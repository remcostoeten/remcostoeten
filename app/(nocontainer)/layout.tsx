import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Remcostoeten feature showcase",
    description: "All kinds of random productivity tools i've built for myself.",
}
interface BasicLayoutProps {
    children: React.ReactNode
}

export default function BasicLayout({ children }: BasicLayoutProps) {
    return (
        <>
            <div className="relative mt-14 clear-header flex flex-col">
                <section>{children}</section>
            </div>
        </>
    )
}
