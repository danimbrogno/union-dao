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
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useConfig } from '../shared/Config';
import { unionFacetABI } from 'shared';
import { useEffect, useRef } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { useDebounce } from 'usehooks-ts';

interface Values {
  name: string;
}
export const Create = () => {
  const formikRef = useRef<null | FormikProps<Values>>();

  const {
    addresses: { diamond },
  } = useConfig();
  const { data, isLoading } = useContractRead({
    address: getAddress(diamond),
    abi: unionFacetABI,
    functionName: 'getUnionName',
    args: [0n],
  });

  const handleSubmit = (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    // resetForm();
  };

  return (
    <Formik<Values>
      innerRef={(ref) => (formikRef.current = ref)}
      onSubmit={handleSubmit}
      initialValues={{ name: '' }}
    >
      <WagmiForm />
    </Formik>
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
