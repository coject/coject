var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect } from 'react';
// React Hook Form
import { useForm, FormProvider } from 'react-hook-form';
// Request
import { Request } from '../../Services';
// Components
import { Input } from '../Input';
import { Select } from '../Select';
import { DatePicker } from '../DatePicker';
export const Form = (_a) => {
    var { name, offline, mode, getForm, storeData, customData, rowIndex, schema, dataSource, onSubmit, onSubmitData, onSubmitClear, gridMode, children, dispatch, storeSchema } = _a, props = __rest(_a, ["name", "offline", "mode", "getForm", "storeData", "customData", "rowIndex", "schema", "dataSource", "onSubmit", "onSubmitData", "onSubmitClear", "gridMode", "children", "dispatch", "storeSchema"]);
    const Methods = useForm();
    const Watching = JSON.stringify(Methods.watch());
    const Data = dataSource && dataSource.staticData ? Object.assign(Object.assign({}, customData), dataSource.staticData) : customData ? customData : {};
    // Reset Function
    const ResetFunction = () => {
        onSubmitClear && Methods.reset();
    };
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (SubmitData) => {
        var _a, _b;
        onSubmit && onSubmit(SubmitData);
        const FinalData = onSubmitData ? onSubmitData(SubmitData) : SubmitData;
        if (dataSource) {
            if (!offline) {
                const DataForm = new FormData();
                const DataJSON = name ? { [name]: FinalData } : FinalData;
                if (dataSource && dataSource.formData) {
                    for (let Index = 0; Index < Object.keys(FinalData).length; Index++) {
                        if (FinalData[Object.keys(FinalData)[Index]] instanceof Array || FinalData[Object.keys(FinalData)[Index]] instanceof FileList) {
                            if (((_a = FinalData[Object.keys(FinalData)[Index]]) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                                for (let FileIndex = 0; FileIndex < FinalData[Object.keys(FinalData)[Index]].length; FileIndex++) {
                                    DataForm.append(Object.keys(FinalData)[Index] + [`[${FileIndex}]`], FinalData[Object.keys(FinalData)[Index]][FileIndex]);
                                }
                            }
                            else {
                                DataForm.append(Object.keys(FinalData)[Index], FinalData[Object.keys(FinalData)[Index]][0]);
                            }
                        }
                        else {
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
            }
            else {
                const HistoryData = storeData ? [...storeData] : [];
                if (mode === 'create') {
                    if (gridMode && FinalData)
                        FinalData[gridMode.key] = (_b = gridMode === null || gridMode === void 0 ? void 0 : gridMode.value) === null || _b === void 0 ? void 0 : _b.create;
                    dispatch({ name, type: 'SUCCESS', payload: [...HistoryData, FinalData] });
                }
                else if (mode === 'update') {
                    if (gridMode && (dataSource === null || dataSource === void 0 ? void 0 : dataSource.primaryKey) && customData[dataSource.primaryKey]) {
                        HistoryData[rowIndex] = FinalData;
                        HistoryData[rowIndex][dataSource.primaryKey] = customData[dataSource.primaryKey];
                        HistoryData[rowIndex][gridMode.key] = gridMode.value.update;
                    }
                    else if (gridMode) {
                        HistoryData[rowIndex] = FinalData;
                        HistoryData[rowIndex][gridMode.key] = gridMode.value.create;
                    }
                    else
                        HistoryData[rowIndex] = FinalData;
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
    const Fields = schema && !!schema.length && (schema === null || schema === void 0 ? void 0 : schema.map((Field) => Field.type));
    return (React.createElement(React.Fragment, null,
        React.createElement(FormProvider, Object.assign({}, Methods),
            React.createElement("form", Object.assign({ onSubmit: Methods.handleSubmit(onFormSubmit) }, props),
                React.createElement("div", { className: "row" },
                    schema &&
                        !!(schema === null || schema === void 0 ? void 0 : schema.length) &&
                        schema.map((Field, Index) => {
                            var _a, _b, _c, _d, _e, _f;
                            if ((_b = (_a = Field === null || Field === void 0 ? void 0 : Field.props) === null || _a === void 0 ? void 0 : _a.cascade) === null || _b === void 0 ? void 0 : _b.parent) {
                                if (mode === 'update')
                                    Field.props.cascade.parentValue = Data[Field.props.cascade.parent];
                                if (mode === 'create')
                                    delete Field.props.cascade.parentValue;
                            }
                            switch ((_c = Field.type) === null || _c === void 0 ? void 0 : _c.toLowerCase()) {
                                case 'input':
                                    return Field.actionTemplate ? (React.createElement(React.Fragment, { key: Index }, Field.actionTemplate(Field))) : (React.createElement("div", { key: Index, className: Field.media ? Field.media : 'col-12' },
                                        React.createElement(Input, Object.assign({ name: Field.field }, Field.props, { value: Data[Field.field] ? Data[Field.field] : (_d = Field === null || Field === void 0 ? void 0 : Field.props) === null || _d === void 0 ? void 0 : _d.value }))));
                                case 'select':
                                    return Field.actionTemplate ? (React.createElement(React.Fragment, { key: Index }, Field.actionTemplate(Field))) : (React.createElement("div", { key: Index, className: Field.media ? Field.media : 'col-12' },
                                        React.createElement(Select, Object.assign({ name: Field.field }, Field.props, { value: Data[Field.field] ? Data[Field.field] : (_e = Field === null || Field === void 0 ? void 0 : Field.props) === null || _e === void 0 ? void 0 : _e.value }))));
                                case 'datePicker':
                                    return Field.actionTemplate ? (React.createElement(React.Fragment, { key: Index }, Field.actionTemplate(Field))) : (React.createElement("div", { key: Index, className: Field.media ? Field.media : 'col-12' },
                                        React.createElement(DatePicker, Object.assign({ name: Field.field }, Field.props, { value: Data[Field.field] ? Data[Field.field] : (_f = Field === null || Field === void 0 ? void 0 : Field.props) === null || _f === void 0 ? void 0 : _f.value }))));
                                default:
                                    return null;
                            }
                        }),
                    children,
                    schema && !!(schema === null || schema === void 0 ? void 0 : schema.length) && Fields.includes('button')
                        ? schema.map((Field, Index) => {
                            if (Field.type === 'button') {
                                if (Field.template) {
                                    return (React.createElement(React.Fragment, { key: Index }, Field.template(Methods.getValues(), storeSchema && !!Object.keys(storeSchema).length && storeSchema.loading)));
                                }
                                else {
                                    return (React.createElement("div", { key: Index, className: Field.media ? Field.media : 'col-12' },
                                        React.createElement("button", Object.assign({}, Field.props, { disabled: storeSchema && !!Object.keys(storeSchema).length && storeSchema.loading }), Field.field)));
                                }
                            }
                            else
                                return null;
                        })
                        : !(offline && !mode) && (React.createElement("button", { type: "submit", disabled: storeSchema && !!Object.keys(storeSchema).length && storeSchema.loading }, "Save")))))));
};
//# sourceMappingURL=index.js.map