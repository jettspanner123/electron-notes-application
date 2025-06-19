import React from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa6";
import {AnimatePresence, motion} from "framer-motion";

interface CustomInputBoxProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    customStyles?: React.CSSProperties
}


export default function CustomInputBox({
                                           type,
                                           placeholder,
                                           value,
                                           onChange,
                                           customStyles
                                       }: CustomInputBoxProps): React.ReactElement {

    const [isFocused, setFocused] = React.useState<boolean>(false);

    const textColor: string = isFocused ? "text-white/70" : "text-white/60";
    const borderColor: string = isFocused ? "border-white/30" : "border-white/20";
    return (
        <input
            type={type}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className={`w-full bg-[#212121] outline-none transition-colors duration-500 border-[0.5px] ${borderColor} ${textColor} !p-[0.75rem] text-[1.15rem] rounded-[1rem] !px-[1.25rem]`}
            style={customStyles}
        />
    )
}

interface SecureCustomInputBoxProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    customStyles?: React.CSSProperties;
}

export function SecureCustomInputBox({
                                         placeholder,
                                         value,
                                         onChange,
                                         customStyles
                                     }: SecureCustomInputBoxProps): React.ReactElement {


    const [isFocused, setFocused] = React.useState<boolean>(false);
    const [isPasswordShow, setShowPassword] = React.useState<boolean>(false);
    const textColor: string = isFocused ? "text-white/70" : "text-white/60";
    const borderColor: string = isFocused ? "border-white/30" : "border-white/20";
    return (
        <div className={`w-full relative`}>
            <input
                type={isPasswordShow ? "text" : "password"}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.value);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                style={customStyles}
                className={`w-full bg-[#212121] outline-none transition-colors duration-500 border-[0.5px] ${borderColor} ${textColor} !p-[0.75rem] text-[1.15rem] rounded-[1rem] !px-[1.25rem]`}
            />

            <button
                onClick={() => setShowPassword(!isPasswordShow)}
                className={`absolute text-white/60 !p-[1rem] right-0 top-1/2 -translate-y-[40%] cursor-pointer`}>
                <AnimatePresence mode={"wait"}>
                    {
                        isPasswordShow ? (
                            <motion.div
                                animate={{scale: 1}}
                                initial={{scale: 0}}
                                exit={{scale: 0}}
                                transition={{
                                    duration: 1,
                                    ease: [0.85, 0, 0.15, 1]
                                }}
                            >
                                <FaEyeSlash size={20}/>
                            </motion.div>
                        ) : (
                            <motion.div
                                animate={{scale: 1}}
                                initial={{scale: 0}}
                                exit={{scale: 0}}
                                transition={{
                                    duration: 1,
                                    ease: [0.85, 0, 0.15, 1]
                                }}
                            >
                                <FaEye size={20}/>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </button>
        </div>
    )
}