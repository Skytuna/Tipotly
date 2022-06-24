import { NewTipot, Tipot } from '@utils/types/tipot';
import { Button, Label, TextInput } from 'flowbite-react';

interface Props {
    tipot?: Tipot;
    onSubmit: (newTipot: NewTipot) => void;
}

export default function TipotForm({ tipot, onSubmit }: Props) {
    const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTipot: NewTipot = { title: e.currentTarget['tipot-title'].value };
        onSubmit(newTipot);
    };

    return (
        <form className='flex flex-row gap-4 max-w-md items-end m-auto' onSubmit={submitHandler}>
            <div>
                <Label className='mb-2 block' htmlFor='tipot-title'>
                    Title
                </Label>
                <TextInput
                    maxLength={20}
                    defaultValue={tipot?.title}
                    id='tipot-title'
                    name='tipot-title'
                    type='text'
                    placeholder='Please enter a title...'
                    required={true}
                />
            </div>
            <Button type='submit'>Submit</Button>
        </form>
    );
}
