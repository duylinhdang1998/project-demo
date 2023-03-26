// import { InputLabel } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { Box } from '@mui/system';
// import { customStyles } from 'components/FilterTicket/customStyles';
// import { isEmpty } from 'lodash-es';
// import { Country } from 'models/Country';
// import { memo, useEffect, useState } from 'react';
// import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { Props as SelectProps } from 'react-select';
// import AsyncSelect from 'react-select/async';

// import { useGetCountryList } from 'services/PackageSales/packageSales';

// interface Props<T extends FieldValues> {
//   selectProps?: SelectProps;
//   formProps: UseControllerProps<T>;
//   label?: string;
// }

// const useStyles = makeStyles(() => ({
//   label: {
//     fontSize: '14px !important',
//     color: '#45485E',
//     marginBottom: '4px',
//   },
// }));

// function SelectCountryFilter<T extends FieldValues>({ selectProps, formProps, label }: Props<T>) {
//   const { field } = useController(formProps);
//   const classes = useStyles();
//   const { t } = useTranslation('packageSales');
//   const { data } = useGetCountryList();
//   const [options, setOptions] = useState<Country[]>();

//   useEffect(() => {
//     if (isEmpty(data?.data.hits)) {
//       setOptions(data?.data.hits);
//     }
//   }, [data]);

//   const loadOptionAsync = (inputValue: string) => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(options?.filter(i => i?.name?.toLowerCase().includes(inputValue.toLowerCase())));
//       }, 1000);
//     });
//   };

//   return (
//     <Box>
//       <InputLabel className={classes.label}>{t(`${label}`)}</InputLabel>
//       <AsyncSelect {...selectProps} {...field} styles={customStyles} placeholder={t(`${label}`)} cacheOptions defaultOptions />
//     </Box>
//   );
// }

// export default memo(SelectCountryFilter);
