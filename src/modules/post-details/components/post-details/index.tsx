import * as React from 'react';

import { TPostDetails } from '@/modules/post-details';

export const PostDetails = (props: TPostDetails) => {
  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Post Information
        </h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
          Post details and Personal Info.
        </p>
      </div>

      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-8 sm:px-6'>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Job Title</dt>
            <dd className='mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-3'>
              {props.jobTitle} {props.remote ? '(Remote)' : ''}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6'>
            <dt className='text-sm text-gray-500'>Salary</dt>
            <dd className='mt-1 text-sm font-medium text-gray-900 sm:mt-0'>
              RM {props.salary.toLocaleString()}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-8 sm:px-6'>
            <dt className='text-sm text-gray-500 sm:col-span-2'>
              Year of Experiences
            </dt>
            <dd className='mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-3'>
              {props.yoe}
            </dd>
            <dt className='text-sm text-gray-500 sm:col-span-2'>
              Past Employment
            </dt>
            <dd className='mt-1 text-sm font-medium text-gray-900 sm:mt-0'>
              {props.pastEmployment}
            </dd>
          </div>

          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-8 sm:px-6'>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Based in</dt>
            <dd className='mt-1 text-sm text-gray-900 text-medium sm:mt-0 sm:col-span-3'>
              {props.based}
            </dd>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Remote</dt>
            <dd className='mt-1 text-sm text-gray-900 text-medium sm:mt-0'>
              {props.remote}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6'>
            <dt className='text-sm text-gray-500'>Education</dt>
            <dd className='mt-1 text-sm text-gray-900 text-medium sm:mt-0 sm:col-span-3'>
              {props.education}
            </dd>
          </div>

          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-8 sm:px-6'>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Age</dt>
            <dd className='text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-3'>
              {props.age}
            </dd>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Gender</dt>
            <dd className='text-sm font-medium text-gray-900 sm:mt-0'>
              {props.gender}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-8 sm:px-6'>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Nationality</dt>
            <dd className='text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-3'>
              {props.nationality}
            </dd>
            <dt className='text-sm text-gray-500 sm:col-span-2'>Race</dt>
            <dd className='text-sm font-medium text-gray-900 sm:mt-0'>
              {props.race}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:px-6'>
            <dt className='text-sm text-gray-500'>Thoughts</dt>
            <dd className='mt-1 text-sm text-gray-900 text-medium sm:mt-0 sm:col-span-2'>
              {props.thoughts}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
