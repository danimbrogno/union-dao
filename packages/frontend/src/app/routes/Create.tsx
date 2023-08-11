import {
  Field,
  Formik,
  FormikHelpers,
  FormikProps,
  useFormik,
  useFormikContext,
} from 'formik';
import { getAddress, stringToHex } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useConfig } from '../shared/Config';
import { unionFacetABI } from 'shared';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { useDebounce } from 'usehooks-ts';
import {
  AllUnionsQuery,
  AllUnionsDocument,
  execute,
} from '../../../.graphclient';
import { ExecutionResult } from 'graphql';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Values {
  name: string;
}
export const Create = () => {
  const formikRef = useRef<null | FormikProps<Values>>();

  const [allUnionsQuery, setAllUnionsQuery] = useState<AllUnionsQuery>();

  const getUnions = useCallback(async () => {
    const repeater = (await execute(AllUnionsDocument, {})) as AsyncIterable<
      ExecutionResult<AllUnionsQuery>
    >;

    for await (const result of repeater) {
      if (result.data) {
        setAllUnionsQuery(result.data);
      }
    }
  }, [setAllUnionsQuery]);

  useEffect(() => {
    getUnions();
  }, [getUnions]);

  const handleSubmit = (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {};

  return (
    <>
      <ul>
        {allUnionsQuery?.unions.map((union) => (
          <li key={union.id}>
            {union.id}:{union.name}
          </li>
        ))}
      </ul>
      <Formik<Values>
        innerRef={(ref) => (formikRef.current = ref)}
        onSubmit={handleSubmit}
        initialValues={{ name: '' }}
      >
        <WagmiForm />
      </Formik>
    </>
  );
};

export const WagmiForm = (
  props: React.ClassAttributes<HTMLFormElement> &
    React.FormHTMLAttributes<HTMLFormElement> & {
      css?: Interpolation<Theme>;
    }
) => {
  const {
    handleReset,
    handleSubmit: _handleSubmit,
    values,
    isValid,
    isSubmitting,
    resetForm,
    setSubmitting,
  } = useFormikContext<Values>();

  const debouncedValues = useDebounce(values, 1000);

  const {
    addresses: { diamond },
  } = useConfig();

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'createUnion',
    args: [stringToHex(debouncedValues.name || '', { size: 32 })],
    enabled: isValid ? true : false,
  });

  const { write, data } = useContractWrite(config);

  const { isSuccess, isError, error } = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
  });

  useEffect(() => {
    if (isSuccess === true) {
      setSubmitting(false);
      resetForm();
    }
  }, [isSuccess, setSubmitting, resetForm]);

  useEffect(() => {
    if (isError === true) {
      setSubmitting(false);
    }
  }, [isSuccess, isError, setSubmitting, resetForm]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    write?.();
  };

  return (
    <form onReset={handleReset} onSubmit={handleSubmit}>
      <Field
        disabled={isSubmitting}
        type="input"
        name="name"
        placeholder="Name"
      />
      <button disabled={isSubmitting || !isValid} type="submit">
        Submit
      </button>
      {isSuccess && <p>Success!</p>}
      {isPrepareError && <p>{prepareError?.message}</p>}
      {isError && <p>{error?.message}</p>}
    </form>
  );
};
