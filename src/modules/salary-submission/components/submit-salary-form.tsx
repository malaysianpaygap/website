import * as React from 'react';
import { useForm } from 'react-hook-form';

import { countryOptions } from '@/lib/country-options';

import { ErrorAlert } from '@/components/alert';
import { Button } from '@/components/buttons';
import { Form } from '@/components/form';
import { formatErrors } from '@/components/form/form';
import { Stepper } from '@/components/stepper';

export const SubmitSalaryForm = () => {
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
          >
            <option value=''>Please choose</option>
            <option value='female' label='Female' />
            <option value='male' label='Male' />
            <option value='others' label='Non-binary/others' />
          </Form.DropdownField>
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
          allowOthers
        />
        <Form.DropdownField
          label={labelForPersonalDetails.nationality}
          name='nationality'
          required
        >
          <option value=''>Please choose</option>
          {countryOptions.map((country) => (
            <option value={country.value} key={country.value}>
              {country.label}
            </option>
          ))}
        </Form.DropdownField>
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
          allowOthers
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
  specialization: string;
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
  specialization: 'Job Specialisation (Pengkhususan Pekerjaan)',
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
      specialization: '',
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
        <Form.DropdownField
          name='state'
          label={labelForSalaryDetails.state}
          required
        >
          <option value=''>Please select</option>
          <option value='Federal Territory of Kuala Lumpur'>
            Federal Territory of Kuala Lumpur
          </option>
          <option value='Federal Territory of Labuan'>
            Federal Territory of Labuan
          </option>
          <option value='Federal Territory of Putrajaya'>
            Federal Territory of Putrajaya
          </option>
          <option value='Johor'>Johor</option>
          <option value='Kedah'>Kedah</option>
          <option value='Kelantan'>Kelantan</option>
          <option value='Malacca'>Malacca</option>
          <option value='Negeri Sembilan'>Negeri Sembilan</option>
          <option value='Pahang'>Pahang</option>
          <option value='Penang'>Penang</option>
          <option value='Perak'>Perak</option>
          <option value='Perlis'>Perlis</option>
          <option value='Sabah'>Sabah</option>
          <option value='Sarawak'>Sarawak</option>
          <option value='Selangor'>Selangor</option>
          <option value='Terengganu'>Terengganu</option>
        </Form.DropdownField>
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
          name='industry'
          required
        >
          <option value=''>Please choose</option>
          <option value='Healthcare/Health services'>
            Healthcare/Health services
          </option>
          <option value='Utilities (water, gas, electricity)'>
            Utilities (water, gas, electricity)
          </option>
          <option value='Aviation'>Aviation</option>
          <option value='Construction'>Construction</option>
          <option value='Automotive'>Automotive</option>
          <option value='Supply Chain'>Supply Chain</option>
          <option value='Real Estate'>Real Estate</option>
          <option value='Engineering'>Engineering</option>
          <option value='Manufacturing'>Manufacturing</option>
          <option value='Technology/IT/Data'>Technology/IT/Data</option>
          <option value='Web3'>Web3</option>
          <option value='Food & Beverage'>Food & Beverage</option>
          <option value='Hardware & Semiconductor'>
            Hardware & Semiconductor
          </option>
          <option value='Gaming'>Gaming</option>
          <option value='Recruitment'>Recruitment</option>
          <option value='Public Service'>Public Service</option>
          <option value='Veterinary'>Veterinary</option>
          <option value='Fitness'>Fitness</option>
          <option value='E-commerce & Retail'>E-commerce & Retail</option>
          <option value='Finance'>Finance</option>
          <option value='Media & Entertainment'>Media & Entertainment</option>
          <option value='Medical Devices Industry'>
            Medical Devices Industry
          </option>
          <option value='Transportation/Logistics'>
            Transportation/Logistics
          </option>
          <option value='Oil & Gas'>Oil & Gas</option>
          <option value='Telecommunication Services'>
            Telecommunication Services
          </option>
          <option value='Financial services/Investment/Banking/Insurance'>
            Financial services/Investment/Banking/Insurance
          </option>
          <option value='Chemical'>Chemical</option>
          <option value='FMCG'>FMCG</option>
          <option value='NGOs'>NGOs</option>
          <option value='Business Process Outsourcing (BPO)'>
            Business Process Outsourcing (BPO)
          </option>
          <option value='Architecture'>Architecture</option>
          <option value='Consulting'>Consulting</option>
          <option value='Pharmaceutical'>Pharmaceutical</option>
          <option value='Tourism/Hospitality'>Tourism/Hospitality</option>
          <option value='Fashion'>Fashion</option>
          <option value='Creative Arts'>Creative Arts</option>
          <option value='Legal'>Legal</option>
          <option value='Agriculture/Plantation'>Agriculture/Plantation</option>
          <option value='Education'>Education</option>
          <option value='Public Relations'>Public Relations</option>
          <option value='Other'>Other</option>
        </Form.DropdownField>
        {/* Todo: Add allowOthers prop for DropdownField */}
        <Form.DropdownField
          label={labelForSalaryDetails.specialization}
          name='specialization'
        >
          <option value=''>Please choose</option>
          <option value='Admin'>Admin</option>
          <option value='Accounting'>Accounting</option>
          <option value='Architect'>Architect</option>
          <option value='Audit/Taxation'>Audit/Taxation</option>
          <option value='Business Development'>Business Development</option>
          <option value='Creative - Art direction/visual design/copywriting'>
            Creative - Art direction/visual design/copywriting
          </option>
          <option value='Consulting'>Consulting</option>
          <option value='Corporate Communications'>
            Corporate Communications
          </option>
          <option value='Customer Service'>Customer Service</option>
          <option value='Design'>Design</option>
          <option value='Engineering'>Engineering</option>
          <option value='Human Resources'>Human Resources</option>
          <option value='Interior Design'>Interior Design</option>
          <option value='IT - Data'>IT - Data</option>
          <option value='IT - Hardware'>IT - Hardware</option>
          <option value='IT - Network/DB/Sys'>IT - Network/DB/Sys</option>
          <option value='IT - Software'>IT - Software</option>
          <option value='Journalist/Editor'>Journalist/Editor</option>
          <option value='Legal'>Legal</option>
          <option value='Maintenance'>Maintenance</option>
          <option value='Marketing'>Marketing</option>
          <option value='Project Management'>Project Management</option>
          <option value='Purchasing & Procurement'>
            Puchasing & Procurement
          </option>
          <option value='Quantity Survey'>Quantity Survey</option>
          <option value='Sales'>Sales</option>
          <option value='Secretarial/Personal Assistant'>
            Secretarial/Personal Assistant
          </option>
          <option value='Other'>Other</option>
        </Form.DropdownField>
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
          <h1 className='font-medium font-bold text-xl text-gray-700'>
            We might need you again in near future. Kami perlukan anda.
          </h1>
          <p className='font-medium text-sm text-gray-700 mt-2'>
            In order to make better use of the data in the future, we may need
            to obtain additional information via email, such as incomplete
            personal or demographic data or consent. To the extent that you are
            willing, please provide your email address for our future reference.
            Please note that we will not share your personal information with
            any other parties, such as marketing companies. Your submission will
            be shared publicly. However, your email will only be private and
            used by MPG for future correspondence.
          </p>
          <p className='font-medium text-sm text-gray-700 mt-4'>
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
