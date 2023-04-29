import * as React from 'react';
import DashboardSection from './components/DashboardSection';

const DashboardCustomer = props => {
  const buttonsDashboard = [];

  console.log('props.userProps.seeOrderForm', props.userProps.seeOrderForm);
  console.log(
    'props.userProps.customerProductBatch',
    props.userProps.customerProductBatch,
  );

  buttonsDashboard.push(
    {
      key: 'section1_button1',
      title: 'Site Records',
      colour: '#fdc73e',
      icon: 'archive',
      goto: 'SiteRecords',
      width: '46%',
    },
    {
      key: 'section1_button2',
      title: 'Contacts',
      colour: '#fdc73e',
      icon: 'users',
      goto: 'Contacts',
      width: '46%',
    },
    {
      key: 'section1_button3',
      title: 'Falcon Anemoi',
      colour: '#fdc73e',
      icon: 'cloud-lightning',
      goto: 'Anemoi',
      width: '46%',
    },
    {
      key: 'section1_button4',
      title: 'Stats',
      colour: '#fdc73e',
      icon: 'pie-chart',
      goto: 'Stats',
      width: '46%',
    },
  );

  if (props.userProps.seeSnapshots > 0) {
    buttonsDashboard.push({
      key: 'section1_button5',
      title: 'Snapshots',
      colour: '#fdc73e',
      icon: 'camera',
      goto: 'Snapshots',
      width: '46%',
    });
  }

  return (
    <>
      <DashboardSection
        key="section1"
        title="Dashboard"
        style={{flexWrap: 'wrap'}}
        buttons={buttonsDashboard}></DashboardSection>

      {props.userProps.seeOrderForm == 1 &&
      props.userProps.customerProductBatch == 1 ? (
        <DashboardSection
          key="section2"
          title="Order Forms"
          buttons={[
            {
              key: 'section2_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'OrderFormsNew',
              width: '46%',
            },
            {
              key: 'section2_button2',
              title: 'Completed',
              colour: '#489b1a',
              icon: 'check',
              goto: 'OrderFormsCompleted',
              width: '46%',
            },
          ]}></DashboardSection>
      ) : null}

      {/* {props.userProps.hasBulletins === 1 ? (
        <DashboardSection
          key="yard"
          title="Yard"
          buttons={[
            {
              key: 'yard_button1',
              title: 'Barcoding',
              colour: '#fdc73e',
              icon: 'cast',
              goto: 'YardBarcoding',
            },
            {
              key: 'yard_button2',
              title: 'Scan',
              colour: '#fdc73e',
              icon: 'codesandbox',
              goto: 'YardScan',
            },
            {
              key: 'yard_button3',
              title: 'Loading',
              colour: '#fdc73e',
              icon: 'truck',
              goto: 'YardLoading',
            },
          ]}></DashboardSection>
      ) : null} */}
    </>
  );
};

export default DashboardCustomer;
