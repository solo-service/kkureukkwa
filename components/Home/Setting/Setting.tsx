import { Button, ButtonGroup, Input } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function Setting() {

    const {register,handleSubmit} = useForm();

    const onSubmit = (event : any)=>{
        const {nickname} = event;
        console.log(nickname);
    }

    return (
        <div className="absolute bottom-0 left-0 w-full h-[95%] z-10 bg-white rounded-2xl py-12 px-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-sm">닉네임 변경</p>
                <Input
                    className='mt-2'
                    type="text"
                    placeholder="닉네임"
                    isInvalid={false}
                    errorMessage="Please enter a valid email"
                    {...register("nickname")}
                />
                <ButtonGroup className="w-full mt-2">
                    <Button type="submit" className="ml-auto" color="primary" size="sm">
                        닉네임 변경
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    )

}
