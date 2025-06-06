"use client"

import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useCallback, useState} from "react";
import {useReCaptcha} from "next-recaptcha-v3";

const Subscribe = () => {

    const [email, setEmail] = useState("");

    const {executeRecaptcha} = useReCaptcha();
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            const token = await executeRecaptcha("form_submit");

            await fetch("https://nocodb.com/api/v1/newsletter", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    recaptchaToken: token,
                }),
            });
        },
        [email, executeRecaptcha],
    );

    return (
        <div className="bg-nc-background-grey-extra-light mt-8 lg:mt-20">
            <div className="container py-16 flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
                <Image src="/img/blog/illustrations/subscribe.png" alt="Subscribe" width={420} height={400}
                       className="w-full lg:w-3/8"/>
                <div className="flex flex-col w-full lg:w-5/8 items-start justify-center">
                    <h3 className="text-nc-content-grey-emphasis leading-9 font-medium text-2xl">
                        Subscribe to our Newsletter
                    </h3>
                    <h5 className="text-base mt-2 text-nc-content-grey-default font-light leading-6">
                        Keep up with our latest news and updates.
                    </h5>
                    <form className="flex flex-col lg:flex-row w-full gap-3 mt-6 items-center" onSubmit={handleSubmit}>
                        <Input type="email" className="flex-1 w-full" placeholder="Enter your email address..."
                               onChange={(e) => setEmail(e.target.value)}/>
                        <Button type="submit" className="w-full lg:w-auto font-medium">
                            Submit
                        </Button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Subscribe