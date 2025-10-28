"use client";

import Image from "next/image";
import { useReCaptcha } from "next-recaptcha-v3";
import type React from "react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const { executeRecaptcha } = useReCaptcha();
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
    [email, executeRecaptcha]
  );

  return (
    <div className="mt-8 bg-nc-background-grey-extra-light lg:mt-20">
      <div className="container flex flex-col items-center gap-6 py-16 lg:flex-row lg:gap-16">
        <Image
          alt="Subscribe"
          className="w-full lg:w-3/8"
          height={400}
          src="/img/blog/illustrations/subscribe.png"
          width={420}
        />
        <div className="flex w-full flex-col items-start justify-center lg:w-5/8">
          <h3 className="font-medium text-2xl text-nc-content-grey-emphasis leading-9">
            Subscribe to our Newsletter
          </h3>
          <h5 className="mt-2 font-light text-base text-nc-content-grey-default leading-6">
            Keep up with our latest news and updates.
          </h5>
          <form
            className="mt-6 flex w-full flex-col items-center gap-3 lg:flex-row"
            onSubmit={handleSubmit}
          >
            <Input
              className="w-full flex-1"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              type="email"
            />
            <Button className="w-full font-medium lg:w-auto" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
