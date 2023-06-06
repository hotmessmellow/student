import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginSchema } from "../utils/schemas";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { login } from "../slices/auth";
import Head from "next/head";
import ParticlesBackground from "../components/particles";

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isConnected } = useAccount();
  const router = useRouter();

  const submitData = (data) => {
    dispatch(login(data.formData))
      .unwrap()
      .then((response) => {
        console.log(response);
        toast({
          title: "Success",
          description: "You have successfully logged in",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/");
    }
  }, [isConnected]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8 bg-[#131216]">
        <ParticlesBackground />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white border-2 border-[#807f82] shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center align-middle sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="w-auto h-12 mx-auto"
                src="/logo.png"
                alt="Workflow"
              />

              <h1 className="text-xl font-bold text-center uppercase">
                Student Portal
              </h1>
            </div>
            <Form
              className="text-black"
              schema={loginSchema}
              onSubmit={submitData}
              validator={validator}
              liveValidate
            />

            <p className="py-2 text-left">OR</p>

            <div className="flex justify-start py-2">
              <a href="/register" className="font-semibold">
                Register Student Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
