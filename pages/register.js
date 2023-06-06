import { useDispatch } from "react-redux";
import { userSchema } from "../utils/schemas";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv8";
import { register } from "../slices/auth";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import Head from "next/head";
import ParticlesBackground from "../components/particles";

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();

  const toast = useToast();
  const submitData = (data) => {
    dispatch(register(data.formData))
      .unwrap()
      .then((res) => {
        toast({
          title: "Success",
          description: "You have successfully registered",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        router.push("/login");
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8 bg-[#131216]">
        <ParticlesBackground />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white border-2 border-[#807f82]  shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center text-black align-middle sm:mx-auto sm:w-full sm:max-w-md">
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
              schema={userSchema}
              onSubmit={submitData}
              validator={validator}
              liveValidate
            />
          </div>
        </div>
      </div>
    </>
  );
}
