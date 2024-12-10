import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILoginInputs } from "@/interfaces";
import { AtSign } from "lucide-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

function EmailLocal({ register }: { register: UseFormRegister<ILoginInputs> }) {
    return (
        <div>
            <Label htmlFor="input-09">Email</Label>
            <div className="relative">
                <Input
                    id="input-09"
                    className="peer ps-9"
                    placeholder="Email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}

export default EmailLocal;
