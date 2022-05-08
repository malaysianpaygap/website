import * as React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { countryOptions } from '@/lib/country-options';
import { stateOptions } from '@/lib/state-options';

import { ErrorAlert } from '@/components/alert';
import { Button } from '@/components/buttons';
import { Form } from '@/components/form';
import { formatErrors } from '@/components/form/form';
import { Stepper } from '@/components/stepper';

import industries from '~/constants/industries.json';
import specialisation from '~/constants/specialisation.json';

export const SubmitSalaryForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formIndex, setFormIndex] = React.useState(0);
  const [personalDetails, setPersonalDetails] = React.useState<
    PersonalDetailsData | undefined
  >(undefined);
  const [salaryDetails, setSalaryDetails] = React.useState<
    SalaryDetails | undefined
  >(undefined);
  const [thoughts, setThoughts] = React.useState<
    ThoughtsAndVerificationDetails | undefined
  >(undefined);

  const handleComplete = async () => {
    if (!executeRecaptcha) return;

    const token = await executeRecaptcha();
    // todo: data to submit
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <Stepper
        activeIndex={formIndex}
        onChange={setFormIndex}
        steps={[
          { label: 'Getting to Know You' },
          { label: 'Breaking Wage Taboo' },
          { label: 'Thoughts & Verifications' },
        ]}
        className='mb-8'
      />
      {formIndex === 0 && (
        <SubmitSalaryPersonalDetailsForm
          initialValues={personalDetails}
          onComplete={(details) => {
            setPersonalDetails(details);
            setFormIndex(1);
          }}
        />
      )}
      {formIndex === 1 && (
        <SubmitSalarySalaryDetailsForm
          initialValues={salaryDetails}
          onComplete={(salary) => {
            setSalaryDetails(salary);
            setFormIndex(2);
          }}
        />
      )}
      {formIndex === 2 && (
        <SubmitSalaryThoughtsAndVerificationForm
          initialValues={thoughts}
          onComplete={(th) => {
            setThoughts(th);
            handleComplete();
          }}
        />
      )}
    </div>
  );
};

interface PersonalDetailsData {
  age: string;
  gender: string;
  nationality: string;
  race?: string;
  education?: string;
}

const labelForPersonalDetails: Record<keyof PersonalDetailsData, string> = {
  age: 'Age (Umur)',
  gender: 'Gender identity (Jantina)',
  nationality: 'Nationality (Warganegara)',
  race: 'Race (Kaum)',
  education:
    'What is your highest education qualification? (Apakah kelayakan pendidikan tertinggi anda?)',
};

const SubmitSalaryPersonalDetailsForm = (props: {
  initialValues?: PersonalDetailsData;
  onComplete: (data: Required<PersonalDetailsData>) => void;
}) => {
  const form = useForm<PersonalDetailsData>({
    defaultValues: props.initialValues || {
      age: '',
      gender: '',
      nationality: '',
    },
  });

  const { formState, handleSubmit } = form;

  const formErrors = formatErrors(formState.errors, labelForPersonalDetails);

  return (
    <Form
      form={form}
      onSubmit={handleSubmit((values) => {
        props.onComplete(values as any);
      })}
    >
      <div className='space-y-8'>
        <ErrorAlert errors={formErrors} />
        <div className='grid md:grid-cols-2 gap-8'>
          <Form.NumberField
            label={labelForPersonalDetails.age}
            name='age'
            min={12}
            required
            decimalPlaces={0}
          />
          <Form.DropdownField
            label={labelForPersonalDetails.gender}
            name='gender'
            required
            options={[
              { label: 'Please choose', value: '' },
              { label: 'Female', value: 'female' },
              { label: 'Male', value: 'male' },
              { label: 'Non-binary/others', value: 'other' },
            ]}
          />
        </div>
        <Form.RadioField
          label={labelForPersonalDetails.race}
          name='race'
          required
          layout='horizontal'
          options={[
            {
              label: 'Malay',
              value: 'Malay',
            },
            {
              label: 'Indian',
              value: 'Indian',
            },
            {
              label: 'Chinese',
              value: 'Chinese',
            },
            {
              label: 'Sarawakian Ethic',
              value: 'Sarawakian Ethic',
            },
            {
              label: 'Sabahan Ethic',
              value: 'Sabahan Ethic',
            },
          ]}
          allowOther
        />
        <Form.SearchableDropdownField
          label={labelForPersonalDetails.nationality}
          name='nationality'
          required
          options={[...countryOptions]}
          id='nationality-dropdown'
        />
        <Form.RadioField
          label={labelForPersonalDetails.education}
          name='education'
          required
          options={[
            {
              label: 'High School (Sekolah Menengah)',
              value: 'High School (Sekolah Menengah)',
            },
            {
              label: 'Professional Certification(s) (Sijil Profesional)',
              value: 'Professional Certification(s) (Sijil Profesional)',
            },
            {
              label: 'Diploma',
              value: 'Diploma',
            },
            {
              label: "Bachelor's Degree (Ijazah Sarjana Muda)",
              value: "Bachelor's Degree (Ijazah Sarjana Muda)",
            },
            {
              label: "Bachelor's Degree (Overseas)",
              value: "Bachelor's Degree (Overseas)",
            },
            {
              label: "Master's Degree",
              value: "Master's Degree",
            },
            {
              label: "Master's Degree (Overseas)",
              value: "Master's Degree (Overseas)",
            },
            {
              label: 'PhD',
              value: 'PhD',
            },
            {
              label: 'PhD (Overseas)',
              value: 'PhD (Overseas)',
            },
          ]}
        />
        <div>
          <Button type='submit' className='w-full justify-center'>
            NEXT
          </Button>
        </div>
      </div>
    </Form>
  );
};

interface SalaryDetails {
  jobTitle: string;
  yearsOfExperience: string;
  numOfJobs: string;
  workingInMsia: string;
  isJobRemote: string;
  state: string;
  typeOfCompany: string;
  industry: string;
  otherIndustry: string;
  specialisation: string;
  otherSpecialisation: string;
  averageWorkingHour: string;
  averageWorkingDay: string;
  monthSalaryInMyr: string;
  firstJobSalaryInMyr: string;
  salarySatisfaction: string;
  overallJobSatisfaction: string;
}

const labelForSalaryDetails: Record<keyof SalaryDetails, string> = {
  jobTitle: 'Job title (Pekerjaan Anda)',
  yearsOfExperience: 'Years of experience (Tahun Pengalaman)',
  numOfJobs:
    'How many jobs have you held in your career? (Berapa bilangan pekerjaan sepanjang tempoh karier anda?)',
  workingInMsia:
    'Are you working in/from Malaysia? (Anda bekerja di Malaysia?)',
  isJobRemote: 'Is your job remote? (Anda bekerja dari rumah?)',
  state: 'Where are you based? (Tempat anda menetap?)',
  typeOfCompany:
    'What type of company do you work for? (Jenis syarikat yang anda bekerja?)',
  industry: 'Industry (Industri)',
  otherIndustry: `If selected 'Other' for Industry, please clarify (Jika anda memilih ‘Other’ untuk Industri, sila nyatakan)`,
  specialisation: 'Job Specialisation (Pengkhususan Pekerjaan)',
  otherSpecialisation: `If selected 'Other' for Job Specialisation, please clarify (Jika anda memilih ‘Other’ untuk Pengkhususan Pekerjaan, sila nyatakan)`,
  averageWorkingHour:
    'Average working hours per day (Purata jam bekerja dalam sehari)',
  averageWorkingDay:
    'Average working days per week (Purata hari bekerja dalam seminggu)',
  monthSalaryInMyr:
    'Monthly salary in Ringgit Malaysia (Gross: before EPF, tax deduction) (Gaji bulanan dalam Ringgit Malaysia (Gaji Kasar: Sebelum KWSP & tolakan cukai))',
  firstJobSalaryInMyr:
    'Starting salary for your first job in Ringgit Malaysia (Gaji pekerjaan pertama anda dalam Ringgit Malaysia)',
  salarySatisfaction:
    'How happy are you with your current salary/compensation package? (Apa perasaan anda tentang pakej gaji anda sekarang?)',
  overallJobSatisfaction:
    'How satisfied are you with your current job overall? (Secara keseluruhan, adakah anda berpuas hati dengan kerja anda sekarang?)',
};

const SubmitSalarySalaryDetailsForm = (props: {
  initialValues?: SalaryDetails;
  onComplete: (data: Required<SalaryDetails>) => void;
}) => {
  const form = useForm({
    defaultValues: props.initialValues || {
      jobTitle: '',
      yearsOfExperience: '',
      numOfJobs: '',
      workingInMsia: '',
      isJobRemote: '',
      state: '',
      typeOfCompany: '',
      industry: '',
      otherIndustry: '',
      specialisation: '',
      otherSpecialisation: '',
      averageWorkingDay: '',
      averageWorkingHour: '',
      monthSalaryInMyr: '',
      firstJobSalaryInMyr: '',
      salarySatisfaction: '',
      overallJobSatisfaction: '',
    },
  });

  const { formState, handleSubmit } = form;
  const formErrors = formatErrors(formState.errors, labelForSalaryDetails);

  return (
    <Form form={form} onSubmit={handleSubmit(props.onComplete)}>
      <div className='space-y-8'>
        <ErrorAlert errors={formErrors} />
        <Form.TextField
          name='jobTitle'
          label={labelForSalaryDetails.jobTitle}
          required
          minLength={2}
        />
        <Form.NumberField
          name='yearsOfExperience'
          label={labelForSalaryDetails.yearsOfExperience}
          required
          decimalPlaces={0}
        />
        <Form.NumberField
          name='numOfJobs'
          label={labelForSalaryDetails.numOfJobs}
          required
          decimalPlaces={0}
        />
        <div className='grid md:grid-cols-2 gap-8'>
          <Form.RadioField
            name='workingInMsia'
            label={labelForSalaryDetails.workingInMsia}
            options={[
              {
                label: 'Yes',
                value: 'Yes',
              },
              {
                label: 'No',
                value: 'No',
              },
            ]}
            required
            layout='horizontal'
          />
          <Form.RadioField
            name='isJobRemote'
            label={labelForSalaryDetails.isJobRemote}
            options={[
              {
                label: 'Yes',
                value: 'Yes',
              },
              {
                label: 'No',
                value: 'No',
              },
              {
                label: 'Hybrid',
                value: 'Hybrid',
              },
            ]}
            required
            layout='horizontal'
          />
        </div>
        <Form.SearchableDropdownField
          name='state'
          label={labelForSalaryDetails.state}
          required
          options={[...stateOptions]}
          id='state-dropdown'
        />
        <Form.RadioField
          label={labelForSalaryDetails.typeOfCompany}
          name='typeOfCompany'
          required
          options={[
            {
              label: 'Freelance/Self-employed (Bekerja Sendiri)',
              value: 'Freelance/Self-employed (Bekerja Sendiri)',
            },
            {
              label: 'Government-linked companies',
              value: 'Government-linked companies',
            },
            {
              label: 'Multinational corporation',
              value: 'Multinational corporation',
            },
            {
              label: 'Non-profit',
              value: 'Non-profit',
            },
            {
              label: 'Public Sector',
              value: 'Public Sector',
            },
            {
              label: 'Private large enterprises (local)',
              value: 'Private large enterprises (local)',
            },
            {
              label: 'Small & medium-sized enterprises',
              value: 'Small & medium-sized enterprises',
            },
            {
              label: 'Start-up',
              value: 'Start-up',
            },
          ]}
        />
        <Form.DropdownField
          label={labelForSalaryDetails.industry}
          name='industries'
          required
          options={[{ label: 'Please choose', value: '' }, ...industries]}
        />
        <Form.TextField
          label={labelForSalaryDetails.otherIndustry}
          name='otherIndustry'
        />
        <Form.DropdownField
          label={labelForSalaryDetails.specialisation}
          name='specialisation'
          options={[{ label: 'Please choose', value: '' }, ...specialisation]}
        />
        <Form.TextField
          label={labelForSalaryDetails.otherSpecialisation}
          name='otherSpecialisation'
        />
        <Form.NumberField
          label={labelForSalaryDetails.averageWorkingHour}
          name='averageWorkingHour'
          required
          decimalPlaces={1}
          max={24}
        />
        <Form.NumberField
          label={labelForSalaryDetails.averageWorkingDay}
          name='averageWorkingDay'
          required
          decimalPlaces={1}
          max={7}
        />
        <Form.NumberField
          label={labelForSalaryDetails.monthSalaryInMyr}
          name='monthSalaryInMyr'
          required
          decimalPlaces={0}
        />
        <Form.NumberField
          label={labelForSalaryDetails.firstJobSalaryInMyr}
          name='firstJobSalaryInMyr'
          required
          decimalPlaces={0}
        />
        <Form.LinearScaleField
          label={labelForSalaryDetails.salarySatisfaction}
          name='salarySatisfaction'
          required
          fromLabel='Very unhappy (Sangat sedih)'
          toLabel='Very happy (Sangat gembira)'
        />
        <Form.LinearScaleField
          label={labelForSalaryDetails.overallJobSatisfaction}
          name='overallJobSatisfaction'
          required
          fromLabel='Very unsatisfied (Sangat tidak berpuas hati)'
          toLabel='Very satisfied (Sangat berpuas hati)'
        />
        <div>
          <Button type='submit' className='w-full justify-center'>
            NEXT
          </Button>
        </div>
      </div>
    </Form>
  );
};

interface ThoughtsAndVerificationDetails {
  thoughts: string;
  email: string;
}

const labelForThoughts: Record<keyof ThoughtsAndVerificationDetails, string> = {
  thoughts:
    'Additional thoughts/insights you would like to share (Kongsikan pendapat / luahan hati anda)',
  email: 'Email address (Emel)',
};

const SubmitSalaryThoughtsAndVerificationForm = (props: {
  initialValues?: ThoughtsAndVerificationDetails;
  onComplete: (data: Required<ThoughtsAndVerificationDetails>) => void;
}) => {
  const form = useForm({
    defaultValues: props.initialValues || {
      thoughts: '',
      email: '',
    },
  });

  const { formState, handleSubmit } = form;
  const formErrors = formatErrors(formState.errors, labelForThoughts);

  return (
    <Form form={form} onSubmit={handleSubmit(props.onComplete)}>
      <div className='space-y-8'>
        <ErrorAlert errors={formErrors} />
        <Form.TextareaField name='thoughts' label={labelForThoughts.thoughts} />
        <div>
          <h1 className='font-medium text-lg text-gray-700'>
            We might need you again in near future.
          </h1>
          <p className='text-sm text-gray-700 text-justify'>
            In order to make better use of the data in the future, we may need
            to obtain additional information via email, such as incomplete
            personal or demographic data or consent. To the extent that you are
            willing, please provide your email address for our future reference.
            Please note that we will not share your personal information with
            any other parties, such as marketing companies. Your submission will
            be shared publicly. However, your email will only be private and
            used by MPG for future correspondence.
          </p>
          <h1 className='font-medium text-lg text-gray-700 mt-4'>
            Kami perlukan anda.
          </h1>
          <p className='text-sm text-gray-700 text-justify'>
            Untuk mengguna pakai data yang telah diambil dengan lebih berkesan,
            pihak kami mungkin memerlukan lebih informasi di masa hadapan. Jika
            tidak keberatan, sila tinggalkan email anda supaya kami boleh
            hubungi anda jika berlaku perkara seperti “Informasi tidak lengkap,
            data demografik atau berkenaan persetujuan”. Harap maklum, pihak
            kami tidak akan berkongsi maklumat peribadi anda kepada pihak
            ketiga, contohnya seperti agensi pemasaran. Penyerahan data anda
            akan dikongsi kepada pihak awam, tetapi emel anda tidak akan
            dikongsi & hanya akan digunakan oleh MPG untuk menghubungi anda.
          </p>
        </div>
        <Form.TextField
          label={labelForThoughts.email}
          name='email'
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'invalid email address',
            },
          }}
        />
        <div>
          <Button type='submit' className='w-full justify-center'>
            SUBMIT
          </Button>
        </div>
      </div>
    </Form>
  );
};
