function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var antd = require('antd');
var TextArea = _interopDefault(require('antd/lib/input/TextArea'));
require('antd/dist/antd.css');
var L = _interopDefault(require('leaflet'));
var reactLeaflet = require('react-leaflet');
require('leaflet/dist/leaflet.css');
var icon = _interopDefault(require('leaflet/dist/images/marker-icon.png'));
var iconShadow = _interopDefault(require('leaflet/dist/images/marker-shadow.png'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
var defaultCenter = {
  lat: 0,
  lng: 0
};

var DraggableMarker = function DraggableMarker(_ref) {
  var changePos = _ref.changePos,
      position = _ref.position;
  var markerRef = React.useRef(null);
  var eventHandlers = React.useMemo(function () {
    return {
      dragend: function dragend() {
        var marker = markerRef.current;

        if (marker != null) {
          var newPos = marker.getLatLng();
          changePos(newPos);
        }
      }
    };
  }, []);
  reactLeaflet.useMapEvents({
    click: function click(e) {
      var newPos = e.latlng;
      changePos(newPos);
    }
  });

  if (!(position !== null && position !== void 0 && position.lat) && !(position !== null && position !== void 0 && position.lng)) {
    return '';
  }

  return /*#__PURE__*/React__default.createElement(reactLeaflet.Marker, {
    eventHandlers: eventHandlers,
    position: position,
    ref: markerRef,
    draggable: true
  });
};

var MapRef = function MapRef(_ref2) {
  var center = _ref2.center;
  var map = reactLeaflet.useMap();
  map.panTo(center);
  return null;
};

var Maps = function Maps(_ref3) {
  var form = _ref3.form,
      id = _ref3.id,
      center = _ref3.center;

  var _useState = React.useState({
    lat: null,
    lng: null
  }),
      position = _useState[0],
      setPosition = _useState[1];

  var changePos = function changePos(newPos) {
    setPosition(newPos);

    if (newPos !== null && newPos !== void 0 && newPos.lat && newPos !== null && newPos !== void 0 && newPos.lng) {
      var _form$setFieldsValue;

      form.setFieldsValue((_form$setFieldsValue = {}, _form$setFieldsValue[id] = newPos, _form$setFieldsValue));
    }
  };

  var _onChange = function onChange(cname, e) {
    var _extends2;

    changePos(_extends({}, position, (_extends2 = {}, _extends2[cname] = parseFloat(e), _extends2)));
  };

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(antd.Row, {
    justify: "space-between",
    style: {
      marginBottom: '10px'
    }
  }, /*#__PURE__*/React__default.createElement(antd.Col, {
    span: 12,
    style: {
      paddingRight: '10px'
    }
  }, /*#__PURE__*/React__default.createElement(antd.InputNumber, {
    placeholder: "Latitude",
    style: {
      width: '100%'
    },
    value: (position === null || position === void 0 ? void 0 : position.lat) || null,
    min: "-90",
    max: "90",
    onChange: function onChange(e) {
      return _onChange('lat', e);
    }
  })), /*#__PURE__*/React__default.createElement(antd.Col, {
    span: 12,
    style: {
      paddingLeft: '10px'
    }
  }, /*#__PURE__*/React__default.createElement(antd.InputNumber, {
    placeholder: "Longitude",
    className: "site-input-right",
    style: {
      width: '100%'
    },
    value: (position === null || position === void 0 ? void 0 : position.lng) || null,
    min: "-180",
    max: "180",
    onChange: function onChange(e) {
      return _onChange('lng', e);
    }
  }))), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement(antd.Col, {
    span: 24
  }, /*#__PURE__*/React__default.createElement(reactLeaflet.MapContainer, {
    zoom: 13,
    scrollWheelZoom: false,
    style: {
      height: '300px',
      width: '100%'
    }
  }, /*#__PURE__*/React__default.createElement(MapRef, {
    center: position !== null && position !== void 0 && position.lat && position !== null && position !== void 0 && position.lng ? position : center || defaultCenter
  }), /*#__PURE__*/React__default.createElement(reactLeaflet.TileLayer, {
    attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/React__default.createElement(DraggableMarker, {
    form: form,
    id: id,
    changePos: changePos,
    position: position
  })))));
};

var Question = function Question(_ref) {
  var fields = _ref.fields,
      cascade = _ref.cascade,
      form = _ref.form;

  var _useState = React.useState(null),
      value = _useState[0],
      setValue = _useState[1];

  return fields.map(function (f, key) {
    return /*#__PURE__*/React__default.createElement(antd.Form.Item, {
      key: key,
      name: f.id,
      label: key + 1 + ". " + f.name,
      rules: [{
        required: true
      }]
    }, f.type === 'option' ? f.option.length < 3 ? /*#__PURE__*/React__default.createElement(antd.Radio.Group, null, /*#__PURE__*/React__default.createElement(antd.Space, {
      direction: "vertical"
    }, f.option.map(function (o, io) {
      return /*#__PURE__*/React__default.createElement(antd.Radio, {
        key: io,
        value: o.name
      }, o.name);
    }))) : /*#__PURE__*/React__default.createElement(antd.Select, {
      style: {
        width: '100%'
      }
    }, f.option.map(function (o, io) {
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        key: io,
        value: o.name
      }, o.name);
    })) : f.type === 'multiple_option' ? /*#__PURE__*/React__default.createElement(antd.Select, {
      mode: "multiple",
      style: {
        width: '100%'
      }
    }, f.option.map(function (o, io) {
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        key: io,
        value: o.name
      }, o.name);
    })) : f.type === 'cascade' ? /*#__PURE__*/React__default.createElement(antd.Cascader, {
      options: cascade[f.option]
    }) : f.type === 'date' ? /*#__PURE__*/React__default.createElement(antd.DatePicker, {
      style: {
        width: '100%'
      }
    }) : f.type === 'number' ? /*#__PURE__*/React__default.createElement(antd.InputNumber, {
      style: {
        width: '100%'
      }
    }) : f.type === 'text' ? /*#__PURE__*/React__default.createElement(TextArea, {
      row: 4
    }) : f.type === 'geo' ? /*#__PURE__*/React__default.createElement(antd.Col, null, /*#__PURE__*/React__default.createElement(antd.Input, {
      value: value,
      disabled: true,
      hidden: true
    }), /*#__PURE__*/React__default.createElement(Maps, {
      form: form,
      setValue: setValue,
      id: f.id,
      center: f === null || f === void 0 ? void 0 : f.center
    })) : /*#__PURE__*/React__default.createElement(antd.Input, {
      sytle: {
        width: '100%'
      }
    }));
  });
};

var Webform = function Webform(_ref2) {
  var forms = _ref2.forms,
      onChange = _ref2.onChange,
      onFinish = _ref2.onFinish,
      style = _ref2.style;

  var _Form$useForm = antd.Form.useForm(),
      form = _Form$useForm[0];

  if (!(forms !== null && forms !== void 0 && forms.question_group)) {
    return 'Error Format';
  }

  var onSubmit = function onSubmit(values) {
    if (onFinish) {
      onFinish(values);
    } else {
      console.log(values);
    }
  };

  var onValuesChange = function onValuesChange(value) {
    if (onChange) {
      onChange(value);
    }
  };

  return /*#__PURE__*/React__default.createElement(antd.Form, {
    form: form,
    layout: "vertical",
    name: forms.name,
    onValuesChange: onValuesChange,
    onFinish: onSubmit,
    style: style
  }, forms === null || forms === void 0 ? void 0 : forms.question_group.map(function (g, key) {
    return /*#__PURE__*/React__default.createElement(antd.Card, {
      key: key,
      title: g.name || "Section " + (key + 1)
    }, /*#__PURE__*/React__default.createElement(Question, {
      fields: g.question,
      cascade: forms.cascade,
      form: form
    }));
  }), /*#__PURE__*/React__default.createElement(antd.Row, null, /*#__PURE__*/React__default.createElement(antd.Col, {
    span: 24
  }, /*#__PURE__*/React__default.createElement(antd.Card, null, /*#__PURE__*/React__default.createElement(antd.Form.Item, null, /*#__PURE__*/React__default.createElement(antd.Button, {
    type: "primary",
    htmlType: "submit"
  }, "Submit"))))));
};

exports.Webform = Webform;
//# sourceMappingURL=index.js.map
