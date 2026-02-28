import { useState } from "react";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Interest from "./components/Interest";
import TabForm from "./components/TabForm";

function App() {
  const [formData, setFormData] = useState({});
  console.log("formData >>", formData);
  const onFormDataChangeHandler = ({ name, formField, value }) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          [formField]: value,
        },
      };
    });
  };

  const tabConfig = [
    {
      label: "Profile",
      value: "profile",
      component: Profile,
      componentProps: {
        data: formData?.profile,
        onChangeHandler: onFormDataChangeHandler,
      },
      validate: () => {
        let err = {};
        if (!formData?.profile?.firstName) {
          err.firstName = "First name is required";
        }
        if (!formData?.profile?.lastName) {
          err.lastName = "Last name is required";
        }
        if (!formData?.profile?.email) {
          err.email = "Email is required";
        }
        if (!formData?.profile?.phone) {
          err.phone = "Phone is required";
        }
        return err;
      },
    },
    {
      label: "Settings",
      value: "settings",
      component: Settings,
      componentProps: {
        data: formData?.settings,
        onChangeHandler: onFormDataChangeHandler,
      },
      validate: () => {
        let err = {};
        if (!formData?.settings?.theme) {
          err.theme = "Theme is required";
        }
        return err;
      },
    },
    {
      label: "Interest",
      value: "interest",
      component: Interest,
      componentProps: {
        data: formData?.interest,
        onChangeHandler: onFormDataChangeHandler,
      },
      validate: () => {
        let err = {};
        const interest = formData?.interest || {};
        if (
          Object.keys(interest).length === 0 ||
          Object.values(interest).every((val) => !val)
        ) {
          err.interest = "Interest is required";
        }
        return err;
      },
    },
  ];

  return <TabForm tabConfig={tabConfig} />;
}

export default App;
