import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Extra, FieldLabel, DataApiUrl } from '../support';
import { v4 as uuidv4 } from 'uuid';

const TypeText = ({
  id,
  name,
  label,
  keyform,
  required,
  rules,
  tooltip,
  extra,
  requiredSign,
  dataApiUrl,
  meta_uuid = false,
}) => {
  const form = Form.useFormInstance();
  const { setFieldsValue } = form;
  const extraBefore = extra
    ? extra.filter((ex) => ex.placement === 'before')
    : [];
  const extraAfter = extra
    ? extra.filter((ex) => ex.placement === 'after')
    : [];

  const currentValue = form.getFieldValue([id]);

  console.log(currentValue, 'currentValue****');

  const handleGenerateUUID = useCallback(() => {
    console.log(meta_uuid, currentValue, 'meta_uuid and currentValue');
    if (!currentValue && meta_uuid) {
      const uuid = uuidv4();
      console.log(uuid, 'UUID');
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
        <TextArea
          row={4}
          disabled={meta_uuid}
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
export default TypeText;
