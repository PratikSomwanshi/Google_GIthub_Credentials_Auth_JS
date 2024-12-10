import { Button } from "@/components/ui/button";
import { RiGithubFill } from "@remixicon/react";
import React from "react";

function GithubLoginButton() {
    return (
        <div className="w-full flex justify-center">
            <Button variant="outline" className="w-[90%]">
                <RiGithubFill
                    className="me-3 text-[#333333] dark:text-white/60"
                    size={16}
                    aria-hidden="true"
                />
                Login with GitHub
            </Button>
        </div>
    );
}

export default GithubLoginButton;
