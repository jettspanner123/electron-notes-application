import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ClipLoader} from "react-spinners";

export interface CustomPrimaryButtonProps {
    text: string;
    isLoading?: boolean;
    onClickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    customStyles?: React.CSSProperties;
}

export default function CustomPrimaryButton({
                                                text,
                                                isLoading,
                                                onClickEvent,
                                                customStyles
                                            }: CustomPrimaryButtonProps): React.ReactElement {
    return (
        <button
            onClick={(e) => onClickEvent ? onClickEvent(e) : (): void => {
            }}
            style={customStyles ? customStyles : {}}
            className={`w-full h-[42px] bg-black/20 border-[0.5px] relative border-white/30 text-white/80 !p-[0.5rem] text-[1rem] rounded-[12px] cursor-pointer `}
        >
            <AnimatePresence>
                {!isLoading && (
                    <motion.div
                        initial={{filter: "blur(10px)", scale: 0, opacity: 0}}
                        animate={{filter: "blur(0px)", scale: 1, opacity: 1}}
                        exit={{filter: "blur(10px)", scale: 0, opacity: 0}}
                        transition={{
                            duration: 0.5,
                            ease: [0.85, 0, 0.15, 1]
                        }}
                    >
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{filter: "blur(10px)", scale: 0, opacity: 0}}
                        animate={{filter: "blur(0px)", scale: 1, opacity: 1}}
                        exit={{filter: "blur(10px)", scale: 0, opacity: 0}}
                        transition={{
                            duration: 0.5,
                            ease: [0.85, 0, 0.15, 1]
                        }}
                        className={`absolute left-1/2 top-1/2 -translate-y-[40%] -translate-x-1/2`}
                    >
                        <ClipLoader size={15} color={"white"}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}