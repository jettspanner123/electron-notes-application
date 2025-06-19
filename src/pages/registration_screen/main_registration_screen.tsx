import React from "react";
import ApplicationColors from "../../tools/ApplicationColors.ts";

// MARK: Asset imports
import "../registration.css";


// MARK: Information images
import FirstInformationImage from "../../assets/first_information_image.jpg";
import CustomInputBox, {SecureCustomInputBox} from "../../global_components/CustomInputBox.tsx";
import CustomPrimaryButton from "../../global_components/CustomPrimaryButton.tsx";


export default function MainRegistrationScreen(): React.ReactElement {

    enum RegistrationState {
        LOGIN = "LogIn",
        SIGNUP = "SignUp"
    }

    const [currentRegistrationState, setCurrentRegistrationState] = React.useState<string>(RegistrationState.LOGIN.toString());

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const [isLoading, setLoading] = React.useState<boolean>(false);


    async function handleLogin(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
    }

    return (
        <React.Fragment>
            <main
                style={{backgroundColor: ApplicationColors.mainBackgroundColor}}
                className={`w-screen h-screen flex rounded-[4rem]`}>


                {/*MARK: Main Login Section*/}
                <div className={`h-full flex-1 !p-[1.5rem]`}>
                    <div
                        className={`h-full w-full rounded-[3rem] bg-[rgba(255,255,255,0.03)] border-[0.25px] border-white/20 flex flex-col justify-start items-center !p-[2rem]`}>

                        {/*MARK: Login heading*/}
                        <h1 className={`text-white alumni text-[2.5rem] text-center relative`}>
                            Milovita
                            <div className={`bg-white h-[5px] w-full absolute bottom-[3px] rounded-full`}/>
                        </h1>


                        {/*MARK: Choose current state options*/}
                        <div className={`w-full flex gap-[0.5rem] !mt-[2rem] justify-center `}>
                            {
                                [RegistrationState.LOGIN, RegistrationState.SIGNUP].map((item: RegistrationState): React.ReactElement => {

                                    const textColor: string = currentRegistrationState === item ? "text-black" : "text-white/30";
                                    const backgroundColor: string = currentRegistrationState === item ? "bg-white" : "bg-white/10";
                                    return (
                                        <button
                                            onClick={() => {
                                                setCurrentRegistrationState(item.toString());
                                            }}
                                            className={`${textColor} ${backgroundColor} !p-[0.5rem] rounded-[12px] font-medium transition-colors duration-300 cursor-pointer flex-1`}>
                                            {item.toString()}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        {/*// MARK: Login Email Password*/}
                        <CustomInputBox
                            type={"email"}
                            placeholder={"Username"}
                            value={username}
                            onChange={(text: string): void => setUsername(text)}
                            customStyles={{
                                marginTop: "1rem"
                            }}
                        />


                        <SecureCustomInputBox
                            placeholder={"Password"}
                            value={password}
                            onChange={(text: string): void => setPassword(text)}
                            customStyles={{marginTop: "0.75rem"}}/>


                        <CustomPrimaryButton
                            text={"Log In"}
                            isLoading={isLoading}
                            onClickEvent={handleLogin}
                            customStyles={{ marginTop: "2rem"}}
                        />
                    </div>
                </div>


                {/*MARK: Image and description section*/}
                <div className={`h-full flex-1/5 !pt-[1.5rem] !pb-[1.5rem] !pr-[1.5rem]`}>
                    <div
                        className={`w-full h-full rounded-[3rem] bg-blue-300/10 relative text-white text-[3rem] flex overflow-hidden`}>


                        <div className={`w-full h-full relative`}>

                            {/*MARK: Image div*/}
                            <div className={`w-full h-full absolute`}>
                                <img src={FirstInformationImage} alt={"heading"}
                                     className={`object-center scale-[2.5]`}/>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}