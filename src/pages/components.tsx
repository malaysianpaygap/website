import clsx from 'clsx';
import * as React from 'react';

import { Button } from '@/components/buttons';
import {
  DropdownField,
  LinearScaleField,
  Radio,
  RadioCard,
  RadioField,
  TextareaField,
  TextField,
} from '@/components/form';
import { Layout } from '@/components/layout';
import {
  ArrowLink,
  ButtonLink,
  PrimaryLink,
  UnderlineLink,
  UnstyledLink,
} from '@/components/links';
import { NextImage } from '@/components/next-image';
import { Seo } from '@/components/seo';
import { Skeleton } from '@/components/skeleton';

export default function ComponentsPage() {
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');
  const [color] = React.useState('sky');

  function toggleMode() {
    return mode === 'dark' ? setMode('light') : setMode('dark');
  }

  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const options = [
    {
      label: 'One',
      value: 'One',
    },
    {
      label: 'Two',
      value: 'Two',
    },
    {
      label: 'Three',
      value: 'Three',
    },
  ];

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />

      <main className='py-20 space-y-20 min-h-screen'>
        <section
          className={clsx(mode === 'dark' ? 'bg-dark' : 'bg-gray-50', color)}
        >
          <div
            className={clsx(
              'layout',
              mode === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            <h1>Built-in Components</h1>
            <ArrowLink direction='left' className='mt-2' href='/'>
              Back to Home
            </ArrowLink>

            <div className='mt-8 flex flex-wrap gap-2'>
              <Button
                onClick={toggleMode}
                variant={mode === 'dark' ? 'light' : 'dark'}
              >
                Set to {mode === 'dark' ? 'light' : 'dark'}
              </Button>
              {/* <Button onClick={randomize}>Randomize CSS Variable</Button> */}
            </div>

            <ol className='mt-8 space-y-6'>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>UnstyledLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  No style applied, differentiate internal and outside links,
                  give custom cursor for outside links.
                </p>
                <div className='space-x-2'>
                  <UnstyledLink href='/'>Internal Links</UnstyledLink>
                  <UnstyledLink href='https://theodorusclarence.com'>
                    Outside Links
                  </UnstyledLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>PrimaryLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Add styling on top of UnstyledLink, giving a primary color to
                  the link.
                </p>
                <div className='space-x-2'>
                  <PrimaryLink href='/'>Internal Links</PrimaryLink>
                  <PrimaryLink href='https://theodorusclarence.com'>
                    Outside Links
                  </PrimaryLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>UnderlineLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Add styling on top of UnstyledLink, giving a dotted and
                  animated underline.
                </p>
                <div className='space-x-2'>
                  <UnderlineLink href='/'>Internal Links</UnderlineLink>
                  <UnderlineLink href='https://theodorusclarence.com'>
                    Outside Links
                  </UnderlineLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>ArrowLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Useful for indicating navigation, I use this quite a lot, so
                  why not build a component with some whimsy touch?
                </p>
                <div className='flex flex-wrap items-center gap-4'>
                  <ArrowLink href='/' direction='left'>
                    Direction Left
                  </ArrowLink>
                  <ArrowLink href='/'>Direction Right</ArrowLink>
                  <ArrowLink
                    as={UnstyledLink}
                    className='inline-flex items-center'
                    href='/'
                  >
                    Polymorphic
                  </ArrowLink>
                  <ArrowLink
                    as={ButtonLink}
                    variant='light'
                    className='inline-flex items-center'
                    href='/'
                  >
                    Polymorphic
                  </ArrowLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>ButtonLink</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Button styled link with 3 variants.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <ButtonLink
                    variant='primary'
                    href='https://theodorusclarence.com'
                  >
                    Primary Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='outline'
                    isDarkBg={mode === 'dark'}
                    href='https://theodorusclarence.com'
                  >
                    Outline Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='ghost'
                    isDarkBg={mode === 'dark'}
                    href='https://theodorusclarence.com'
                  >
                    Ghost Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='dark'
                    href='https://theodorusclarence.com'
                  >
                    Dark Variant
                  </ButtonLink>
                  <ButtonLink
                    variant='light'
                    href='https://theodorusclarence.com'
                  >
                    Light Variant
                  </ButtonLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Button</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Ordinary button with style.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <Button variant='primary'>Primary Variant</Button>
                  <Button variant='outline' isDarkBg={mode === 'dark'}>
                    Outline Variant
                  </Button>
                  <Button variant='ghost' isDarkBg={mode === 'dark'}>
                    Ghost Variant
                  </Button>
                  <Button variant='dark'>Dark Variant</Button>
                  <Button variant='light'>Light Variant</Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button disabled variant='primary'>
                    Disabled
                  </Button>
                  <Button disabled variant='outline' isDarkBg={mode === 'dark'}>
                    Disabled
                  </Button>
                  <Button disabled variant='ghost' isDarkBg={mode === 'dark'}>
                    Disabled
                  </Button>
                  <Button disabled variant='dark'>
                    Disabled
                  </Button>
                  <Button disabled variant='light'>
                    Disabled
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button isLoading variant='primary'>
                    Disabled
                  </Button>
                  <Button
                    isLoading
                    variant='outline'
                    isDarkBg={mode === 'dark'}
                  >
                    Disabled
                  </Button>
                  <Button isLoading variant='ghost' isDarkBg={mode === 'dark'}>
                    Disabled
                  </Button>
                  <Button isLoading variant='dark'>
                    Disabled
                  </Button>
                  <Button isLoading variant='light'>
                    Disabled
                  </Button>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Custom 404 Page</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Styled 404 page with some animation.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <ButtonLink href='/404'>Visit the 404 page</ButtonLink>
                </div>
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Next Image</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Next Image with default props and skeleton animation
                </p>
                <NextImage
                  className='mt-8'
                  src='/favicon/apple-icon-180x180.png'
                  width='180'
                  height='180'
                  alt='Icon'
                />
              </li>
              <li className='space-y-2'>
                <h2 className='text-lg md:text-xl'>Skeleton</h2>
                <p className={clsx('!mt-1 text-sm', textColor)}>
                  Skeleton with shimmer effect
                </p>
                <Skeleton className='h-72 w-72' />
              </li>
            </ol>
          </div>
        </section>
        <section>
          <div className='layout'>
            <h1>Form Components</h1>
            <ol className='mt-8 space-y-6'>
              <li>
                <h2>TextField</h2>
                <div className='flex flex-col flex-wrap gap-4'>
                  <TextField label='Default' />
                  <TextField label='Disabled' disabled />
                  <TextField
                    label='Success'
                    status='success'
                    secondaryLabel='Optional'
                  />
                  <TextField label='Warning' status='warning' />
                  <TextField label='Error' status='error' helpText='Required' />
                </div>
              </li>
              <li>
                <h2>DropdownField</h2>
                <div className='flex flex-col flex-wrap gap-4'>
                  <DropdownField
                    label='Default'
                    options={options}
                  ></DropdownField>
                  <DropdownField
                    label='Disabled'
                    disabled
                    options={options}
                  ></DropdownField>
                  <DropdownField
                    label='Success'
                    status='success'
                    secondaryLabel='Optional'
                    options={options}
                  ></DropdownField>
                  <DropdownField
                    label='Warning'
                    status='warning'
                    options={options}
                  ></DropdownField>
                  <DropdownField
                    label='Error'
                    status='error'
                    helpText='Required'
                    options={options}
                  ></DropdownField>
                </div>
              </li>
              <li>
                <h2>TextareaField</h2>
                <div className='flex flex-col flex-wrap gap-4'>
                  <TextareaField label='Default' />
                  <TextareaField label='Disabled' disabled />
                  <TextareaField
                    label='Success'
                    status='success'
                    secondaryLabel='Optional'
                  />
                  <TextareaField label='Warning' status='warning' />
                  <TextareaField
                    label='Error'
                    status='error'
                    helpText='Required'
                  />
                </div>
              </li>
              <li>
                <h2>Radio</h2>
                <RadioDemo />
              </li>
              <li>
                <h2>RadioCard</h2>
                <RadioCardDemo />
              </li>
              <li>
                <h2>LinearScaleField</h2>
                <LinearScaleDemo />
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const RadioDemo = () => {
  const [value, setValue] = React.useState('');
  const [secondValue, setSecondValue] = React.useState('');
  const [loveMe, setLoveMe] = React.useState('');

  return (
    <div className='flex flex-col flex-wrap gap-4'>
      <Radio.Group name='gender' value={value} onChangeValue={setValue}>
        <Radio value='female' label='Female' />
        <Radio value='male' label='Male' />
        <Radio value='others' label='Non-binary/others' disabled />
      </Radio.Group>
      <RadioField
        label='Is your job remote?'
        name='remote'
        value={secondValue}
        onChangeValue={setSecondValue}
        options={[
          {
            label: 'Yes',
            value: 'yes',
          },
          {
            label: 'No',
            value: 'no',
          },
          {
            label: 'Hybrid',
            value: 'hybrid',
          },
        ]}
      />
      <RadioField
        label='Do you love me?'
        name='loveme'
        value={loveMe}
        onChangeValue={setLoveMe}
        layout='horizontal'
        options={[
          {
            label: 'Yes',
            value: 'yes',
          },
          {
            label: 'No',
            value: 'no',
          },
        ]}
      />
    </div>
  );
};

const RadioCardDemo = () => {
  const [value, setValue] = React.useState('');

  return (
    <div className='flex flex-col flex-wrap gap-4'>
      <RadioCard.Group value={value} onChangeValue={setValue}>
        <RadioCard value='1' label='1' />
        <RadioCard value='2' label='2' />
        <RadioCard value='3' label='3' />
        <RadioCard value='4' label='4' />
        <RadioCard value='5' label='5' />
      </RadioCard.Group>
    </div>
  );
};

const LinearScaleDemo = () => {
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <LinearScaleField
      label='How satisfied are you with your current job overall? (Secara keseluruhan, adakah anda berpuas hati dengan kerja anda sekarang?)'
      value={value}
      onChangeValue={setValue}
      fromLabel='Very unsatisfied (Sangat tidak berpuas hati)'
      toLabel='Very satisfied (Sangat berpuas hati)'
      secondaryLabel='Optional'
    />
  );
};
