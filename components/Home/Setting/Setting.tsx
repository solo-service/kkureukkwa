import { Button, ButtonGroup, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function Setting() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (event: any) => {
    const { nickname } = event;

    // eslint-disable-next-line no-console
    console.log(nickname);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-[95%] z-10 bg-white rounded-2xl py-12 px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-sm">닉네임 변경</p>
        <Input
          className="mt-2"
          errorMessage="Please enter a valid email"
          isInvalid={false}
          placeholder="닉네임"
          type="text"
          {...register("nickname")}
        />
        <ButtonGroup className="w-full mt-2">
          <Button className="ml-auto" color="primary" size="sm" type="submit">
            닉네임 변경
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
