import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentSection from "./Widgets/ContentSection";
import Footer from "./Widgets/Footer";


export default function Home() {
    return (
        <>
            <AuthenticatedLayout>
                <ContentSection></ContentSection>
                <Footer></Footer>
            </AuthenticatedLayout>
            
        </>
    );
}
