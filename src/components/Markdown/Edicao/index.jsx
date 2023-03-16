import React from "react";

const Editor = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Visualização</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MDEditor
              value={value}
              onChange={setValue}
              translate="pt-BR"
              preview="edit"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Ed;
