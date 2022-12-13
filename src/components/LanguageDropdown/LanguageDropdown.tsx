import React, { useState, useEffect } from "react";
import { fetchLanguages } from "../../api";
import MultiSelectDropdown from "../universal/MultiSelectDropdown/MultiSelectDropdown";
import { OptionType } from "../types";

import "./LanguageDropdown.styles.css";

interface Props {
  initialValues?: OptionType[];
}

function LanguageDropdown({ initialValues }: Props) {
  const [languages, setLanguages] = useState<OptionType[]>([]);

  const fetchData = () => {
    fetchLanguages()
      .then((data) => {
        if (data?.dictionary) {
          const formattedLanguages: OptionType[] = formatLanguages(
            data.dictionary
          );

          setLanguages(formattedLanguages);
        }
      })
      .catch((error) => console.log(error.message));
  };

  const formatLanguages = (languagesList: any) => {
    const array = Object.entries(languagesList);

    return array.map((item: any[], i) => {
      const { name, nativeName } = item[1];

      return { id: i, name, description: nativeName };
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="LanguageDropdown">
      <MultiSelectDropdown options={languages} initialValues={initialValues} />
    </div>
  );
}

export default LanguageDropdown;
