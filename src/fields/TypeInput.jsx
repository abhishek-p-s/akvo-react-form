import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { Extra, FieldLabel, DataApiUrl } from '../support';
import GlobalStore from '../lib/store';
import { InputFieldIcon } from '../lib/svgIcons';
import { v4 as uuidv4 } from 'uuid';

const TypeInput = ({
  id,
  name,
  label,
  keyform,
  required,
  rules,
  meta,
  tooltip,
  addonAfter,
  addonBefore,
  extra,
  requiredSign,
  dataApiUrl,
  fieldIcons = true,
  meta_uuid = false,
}) => {
  const form = Form.useFormInstance();
  const [showPrefix, setShowPrefix] = useState(true);
  const { setFieldsValue } = form;
  const extraBefore = extra
    ? extra.filter((ex) => ex.placement === 'before')
    : [];
  const extraAfter = extra
    ? extra.filter((ex) => ex.placement === 'after')
    : [];
  const currentValue = form.getFieldValue([id]);

  const updateDataPointName = useCallback(
    (value) => {
      if (meta) {
        GlobalStore.update((gs) => {
          gs.dataPointName = gs.dataPointName.map((g) =>
            g.id === id ? { ...g, value: value } : g
          );
        });
      }
    },
    [meta, id]
  );

  useEffect(() => {
    if (currentValue || currentValue === 0) {
      updateDataPointName(currentValue);
    }
  }, [currentValue, updateDataPointName]);

  const onChange = (e) => {
    updateDataPointName(e.target.value);
  };

  const handleGenerateUUID = useCallback(() => {
    console.log(meta_uuid, currentValue, 'meta_uuid and currentValue');
    if (!currentValue && meta_uuid) {
      const uuid = uuidv4();
      GlobalStore.update((s) => {
        s.current = { ...s.current, [id]: uuid };
      });
      setFieldsValue({
        [id]: uuid,
      });
    }
  }, [currentValue, id, meta_uuid, setFieldsValue]);

  useEffect(() => {
    handleGenerateUUID();
  }, [handleGenerateUUID]);

  return (
    <Form.Item
      className="arf-field"
      label={
        <FieldLabel
          keyform={keyform}
          content={label || name}
          requiredSign={required ? requiredSign : null}
          fieldIcons={fieldIcons}
        />
      }
      tooltip={tooltip?.text}
      required={required}
    >
      {!!extraBefore?.length &&
        extraBefore.map((ex, exi) => (
          <Extra
            key={exi}
            id={id}
            {...ex}
          />
        ))}
      <Form.Item
        className="arf-field-child"
        key={keyform}
        name={id}
        rules={rules}
        required={required}
      >
        <Input
          sytle={{ width: '100%' }}
          onBlur={() => {
            setShowPrefix(true);
          }}
          onFocus={() => setShowPrefix(false)}
          onChange={onChange}
          addonAfter={addonAfter}
          disabled={meta_uuid ? true : false}
          addonBefore={addonBefore}
          prefix={
            fieldIcons && showPrefix && !currentValue && <InputFieldIcon />
          }
        />
      </Form.Item>
      {!!extraAfter?.length &&
        extraAfter.map((ex, exi) => (
          <Extra
            key={exi}
            id={id}
            {...ex}
          />
        ))}
      {dataApiUrl && <DataApiUrl dataApiUrl={dataApiUrl} />}
    </Form.Item>
  );
};
export default TypeInput;
