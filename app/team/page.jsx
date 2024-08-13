"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";

export default function Team() {

    return (
        <>
            <BackgroundLogo/>
            <Header imageSrc="../images/team-header.svg" headerText="NOTRE ÉQUIPE" headerTextTop="60%"/>

            <div className="h-[400vh]">
                <p>
                {/* Your content here */}
                </p>
            </div>
            <Footer/>
        </>
    );

}