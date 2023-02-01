import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Button, Spin } from 'antd';
import ds from '../lib/db';

const SavedSubmissionList = ({ formId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (isLoading && formId) {
      ds.list(formId)
        .then((x) => {
          setDataPoints(x);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [formId, isLoading]);

  const onDeleteDataPoint = (remove) => {
    remove()
      .then((id) => {
        setDataPoints(dataPoints.filter((x) => x.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (isLoading) {
    return (
      <Row
        align="middle"
        justify="center"
        style={{ padding: 24 }}
      >
        <Spin />
      </Row>
    );
  }

  if (!isLoading && !dataPoints.length) {
    return (
      <Row
        align="middle"
        justify="center"
      >
        No Saved Submissions
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {dataPoints.map((x, xi) => (
        <Col
          key={xi}
          className="arf-draft-list"
          span={24}
        >
          <Row>
            <Col
              span={24}
              className="arf-draft-title"
            >
              {xi + 1}. {x.name}
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              className="arf-draft-buttons"
            >
              <Space>
                <Button
                  size="small"
                  onClick={() => x.load()}
                >
                  Load
                </Button>
                <Button
                  size="small"
                  onClick={() => onDeleteDataPoint(x.remove)}
                  type="danger"
                >
                  Delete
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default SavedSubmissionList;
