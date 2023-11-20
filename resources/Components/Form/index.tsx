import React, { FC, useEffect } from 'react';

// React Hook Form
import { useForm, FormProvider } from 'react-hook-form';

// Request
import { Request } from '../../Services';

// Components
import { Input } from '../Input';
import { Select } from '../Select';
import { DatePicker } from '../DatePicker';

// Interface
interface iForm {
    name?: string;
    dataSource?: any;
    offline?: boolean;
    mode?: string;
    getForm?: any;
    storeData?: any;
    customData?: any;
    rowIndex?: any;
    schema?: any;
    onSubmit?: any;
    onSubmitData?: any;
    onSubmitClear?: boolean;
    gridMode?: any;
    children?: any;
    dispatch?: any;
    storeSchema?: any;
}

export const Form: FC<iForm> = ({
    name,
    offline,
    mode,
    getForm,
    storeData,
    customData,
    rowIndex,
    schema,
    dataSource,
    onSubmit,
    onSubmitData,
    onSubmitClear,
    gridMode,
    children,
    dispatch,
    storeSchema,
    ...props
}) => {
    const Methods = useForm();
    const Watching = JSON.stringify(Methods.watch());
    const Data = dataSource && dataSource.staticData ? { ...customData, ...dataSource.staticData } : customData ? customData : {};

    // Reset Function
    const ResetFunction = () => {
        onSubmitClear && Methods.reset();
    };

    // Use Form
    getForm && getForm(Methods);

    // On Form Submit
    const onFormSubmit = (SubmitData: any) => {
        onSubmit && onSubmit(SubmitData);
        const FinalData = onSubmitData ? onSubmitData(SubmitData) : SubmitData;

        if (dataSource) {
            if (!offline) {
                const DataForm = new FormData();
                const DataJSON = name ? { [name]: FinalData } : FinalData;
                if (dataSource && dataSource.formData) {
                    for (let Index = 0; Index < Object.keys(FinalData).length; Index++) {
                        if (FinalData[Object.keys(FinalData)[Index]] instanceof Array || FinalData[Object.keys(FinalData)[Index]] instanceof FileList) {
                            if (FinalData[Object.keys(FinalData)[Index]]?.length > 1) {
                                for (let FileIndex = 0; FileIndex < FinalData[Object.keys(FinalData)[Index]].length; FileIndex++) {
                                    DataForm.append(Object.keys(FinalData)[Index] + [`[${FileIndex}]`], FinalData[Object.keys(FinalData)[Index]][FileIndex]);
                                }
                            } else {
                                DataForm.append(Object.keys(FinalData)[Index], FinalData[Object.keys(FinalData)[Index]][0]);
                            }
                        } else {
                            DataForm.append(Object.keys(FinalData)[Index], FinalData[Object.keys(FinalData)[Index]]);
                        }
                    }
                }
                Request({
                    dataSource,
                    mode,
                    data: dataSource && dataSource.formData ? DataForm : DataJSON,
                    apiUrlId: dataSource.primaryKey ? Data[dataSource.primaryKey] : Data.id,
                    callBack: () => ResetFunction(),
                    dispatch
                }).then();
            } else {
                const HistoryData = storeData ? [...storeData] : [];
                if (mode === 'create') {
                    if (gridMode && FinalData) FinalData[gridMode.key] = gridMode?.value?.create;
                    dispatch({ name, type: 'SUCCESS', payload: [...HistoryData, FinalData] });
                } else if (mode === 'update') {
                    if (gridMode && dataSource?.primaryKey && customData[dataSource.primaryKey]) {
                        HistoryData[rowIndex] = FinalData;
                        HistoryData[rowIndex][dataSource.primaryKey] = customData[dataSource.primaryKey];
                        HistoryData[rowIndex][gridMode.key] = gridMode.value.update;
                    } else if (gridMode) {
                        HistoryData[rowIndex] = FinalData;
                        HistoryData[rowIndex][gridMode.key] = gridMode.value.create;
                    } else HistoryData[rowIndex] = FinalData;
                    dispatch({ name, type: 'SUCCESS', payload: HistoryData });
                }
            }
        }
    };

    // Set Form Data In Store
    useEffect(() => {
        offline && !mode && dispatch({ name: name || 'default', type: 'SUCCESS', payload: JSON.parse(Watching) });
    }, [offline, mode, name, dispatch, Watching]);

    // Schema Fields
    const Fields = schema && !!schema.length && schema?.map((Field: any) => Field.type);

    return (
        <React.Fragment>
            <FormProvider {...Methods}>
                <form onSubmit={Methods.handleSubmit(onFormSubmit)} {...props}>
                    <div className="row">
                        {schema &&
                            !!schema?.length &&
                            schema.map((Field: any, Index: number) => {
                                if (Field?.props?.cascade?.parent) {
                                    if (mode === 'update') Field.props.cascade.parentValue = Data[Field.props.cascade.parent];
                                    if (mode === 'create') delete Field.props.cascade.parentValue;
                                }
                                switch (Field.type?.toLowerCase()) {
                                    case 'input':
                                        return Field.actionTemplate ? (
                                            <React.Fragment key={Index}>{Field.actionTemplate(Field)}</React.Fragment>
                                        ) : (
                                            <div key={Index} className={Field.media ? Field.media : 'col-12'}>
                                                <Input name={Field.field} {...Field.props} value={Data[Field.field] ? Data[Field.field] : Field?.props?.value} />
                                            </div>
                                        );
                                    case 'select':
                                        return Field.actionTemplate ? (
                                            <React.Fragment key={Index}>{Field.actionTemplate(Field)}</React.Fragment>
                                        ) : (
                                            <div key={Index} className={Field.media ? Field.media : 'col-12'}>
                                                <Select name={Field.field} {...Field.props} value={Data[Field.field] ? Data[Field.field] : Field?.props?.value} />
                                            </div>
                                        );
                                    case 'datePicker':
                                        return Field.actionTemplate ? (
                                            <React.Fragment key={Index}>{Field.actionTemplate(Field)}</React.Fragment>
                                        ) : (
                                            <div key={Index} className={Field.media ? Field.media : 'col-12'}>
                                                <DatePicker name={Field.field} {...Field.props} value={Data[Field.field] ? Data[Field.field] : Field?.props?.value} />
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        {children}
                        {schema && !!schema?.length && Fields.includes('button')
                            ? schema.map((Field: any, Index: number) => {
                                  if (Field.type === 'button') {
                                      if (Field.template) {
                                          return (
                                              <React.Fragment key={Index}>
                                                  {Field.template(Methods.getValues(), storeSchema && !!Object.keys(storeSchema).length && storeSchema.loading)}
                                              </React.Fragment>
                                          );
                                      } else {
                                          return (
                                              <div key={Index} className={Field.media ? Field.media : 'col-12'}>
                                                  <button {...Field.props} disabled={storeSchema && !!Object.keys(storeSchema).length && storeSchema.loading}>
                                                      {Field.field}
                                                  </button>
                                              </div>
                                          );
                                      }
                                  } else return null;
                              })
                            : !(offline && !mode) && (
                                  <button type="submit" disabled={storeSchema && !!Object.keys(storeSchema).length && storeSchema.loading}>
                                      Save
                                  </button>
                              )}
                    </div>
                </form>
            </FormProvider>
        </React.Fragment>
    );
};
