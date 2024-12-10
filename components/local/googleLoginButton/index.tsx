import { Button } from "@/components/ui/button";
import { RiGoogleFill } from "@remixicon/react";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function GoogleLoginButton() {
    const [apiError, setApiError] = useState<string | null>(null);

    return (
        <div className="w-full flex justify-center">
            <div>
                {apiError && (
                    <div className="text-red-500 dark:text-red-400">
                        {apiError}
                    </div>
                )}
            </div>
            <Button
                variant="outline"
                className="w-[90%]"
                onClick={async () => {
                    try {
                        const res = await signIn("google", {
                            redirect: false,
                        });

                        if (res?.error) {
                            console.log("error occured");
                            return;
                        }
                    } catch (error) {
                        if (error instanceof AuthError) {
                            setApiError("Something went wrong");
                            console.error(error.message);
                        }
                    }
                }}>
                <RiGoogleFill
                    className="me-3 text-[#DB4437] dark:text-white/60"
                    size={16}
                    aria-hidden="true"
                />
                Login with Google
            </Button>
        </div>
    );
}

export default GoogleLoginButton;
