import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lung Cancer Risk Assessment</title>
        <meta name="description" content="CSC2008 Team37" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p="4">
        <Flex align="center">
          <Spacer />
          <Button as={Link} href="/login" size="sm">
            Admin Login
          </Button>
        </Flex>
        <section className="pt-48 sm:pt-80 bg-white" style={{marginTop: "-100px"}}>
          <div className="flex flex-col px-8 mx-auto max-w-7xl xl:px-12">
            <div className="flex flex-col animated fadeIn sm:flex-row">
              <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                <Image
                  src="/bg.png"
                  className="rounded-lg shadow-xl"
                  alt="logo"
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                  Medical Survey
                </p>
                <h3 className="mt-2 text-2xl sm:text-left md:text-4xl font-bold">
                  Lung Cancer Risk Assessment
                </h3>
                <p className="mt-5 text-lg text-gray-700 text md:text-left">
                  This survey is designed to help you understand your risk of
                  lung cancer. It will take you about 5 minutes to complete.
                </p>
              </div>
            </div>
            <div className="flex justify-start lg:-mt-16">
              <Button as={Link} href="/form" colorScheme="blue" size="lg">
                Start Survey
              </Button>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
}
