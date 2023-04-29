import * as React from 'react';
import DashboardSection from './components/DashboardSection';
import {Text, View, Alert, PermissionsAndroid} from 'react-native';
import {usePostRequest} from '../../client';

const DashboardEmployee = props => {

  return (
    <>
      {props.Props.indexOf('Yard Form') !== -1 ? (
        <DashboardSection
          key="section12"
          title="Yard"
          buttons={[
            {
              key: 'section12_button1',
              title: 'Barcoding',
              colour: '#fdc73e',
              icon: 'align-justify',
              goto: 'YardBarcoding',
            },
            {
              key: 'section12_button3',
              title: 'Scan',
              colour: '#fdc73e',
              icon: 'watch',
              goto: 'YardScan',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('RAMS') !== -1 ? (
        <DashboardSection
          key="section1"
          title="RAMS"
          buttons={[
            {
              key: 'section1_button1',
              width: '45%',
              title: 'Rams',
              colour: '#fdc73e',
              icon: 'archive',
              goto: 'Rams',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Holiday Forms') !== -1 ? (
        <DashboardSection
          key="section2"
          title="Holidays"
          buttons={[
            {
              key: 'section2_button1',
              title: 'Request',
              colour: '#fdc73e',
              icon: 'send',
              goto: 'HolidayRequest',
            },
            {
              key: 'section2_button2',
              title: 'My Holidays',
              colour: '#489b1a',
              icon: 'moon',
              goto: 'HolidaySummary',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Work Instructions') !== -1 ? (
        <DashboardSection
          key="section3"
          title="Work Instructions"
          buttons={[
            {
              key: 'section3_button1',
              title: 'Create New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'WorkInstructionsCreateNew',
            },
            {
              key: 'section3_button2',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'WorkInstructionsSubmitted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Field Time Sheets') !== -1 ? (
        <DashboardSection
          key="section16"
          title="Field Time Sheets"
          buttons={[
            {
              key: 'section16_button1',
              title: 'Create New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'TimeSheetsField',
              width: '29%'
            },
            {
              key: 'section16_button2',
              title: 'Pending',
              colour: '#e26139',
              icon: 'watch',
              goto: 'TimeSheetsFieldPending',
              width: '29%'
            },
            {
              key: 'section16_button3',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'TimeSheetsFieldSubmitted',
              width: '29%'
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Slew Ring Bolt Work Instruction') !== -1 ? (
        <DashboardSection
          key="section5"
          title="Slew Ring Bolt Sheet"
          buttons={[
            {
              key: 'section5_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'SlewRingBoltSheet',
            },
            {
              key: 'section5_button2',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'SlewRingBoltSheetSubmitted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Load Test Certificate') !== -1 ? (
        <DashboardSection
          key="section6"
          title="Load Test Certificate"
          buttons={[
            {
              key: 'section6_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'LoadTestCertificate',
            },
            {
              key: 'section6_button2',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'LoadTestCertificateSubmitted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Anti Collision Sign Off Form') !== -1 ? (
        <DashboardSection
          key="section7"
          title="Anti Collision Sign Off Sheet"
          buttons={[
            {
              key: 'section7_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'AntiCollisionSignOffSheet',
            },
            {
              key: 'section7_button2',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'AntiCollisionSignOffSheetSubmitted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Service Worksheet') !== -1 ? (
        <DashboardSection
          key="section8"
          title="Service Worksheet"
          buttons={[
            {
              key: 'section8_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'ServiceWorksheet',
            },
            {
              key: 'section8_button2',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'ServiceWorksheetSubmitted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Post Operation Form') !== -1 ? (
        <DashboardSection
          key="section9"
          title="Post Operation"
          buttons={[
            {
              key: 'section9_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'PostOperation',
            },
            {
              key: 'section9_button2',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'PostOperationSubmitted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Falcon Policies') !== -1 &&
      props.Props.indexOf('Personnel Files') !== -1 ? (
        <DashboardSection
          key="section10"
          title="Personnel Files"
          buttons={[
            {
              key: 'section10_button1',
              title: 'Policies',
              colour: '#fdc73e',
              icon: 'file',
              goto: 'Policies',
              width: '29%'
            },
            {
              key: 'section10_button2',
              title: 'Personnel',
              colour: '#fdc73e',
              icon: 'user',
              goto: 'Personnel',
              width: '29%'
            },
            {
              key: 'section10_button3',
              title: 'Risk Assessments',
              colour: '#fdc73e',
              icon: 'edit-3',
              goto: 'RiskAssessments',
              width: '29%'
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Falcon Bulletins') !== -1 ? (
        <DashboardSection
          key="section11"
          title="Bulletins"
          buttons={[
            {
              key: 'section11_button1',
              title: 'New',
              colour: '#fdc73e',
              icon: 'send',
              goto: 'BulletinsNew',
            },
            {
              key: 'section11_button2',
              title: 'Completed',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'BulletinsCompleted',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Freight Docs') !== -1 ? (
        <DashboardSection
          key="section14"
          title="Freight Docs"
          buttons={[
            {
              key: 'section14_button1',
              width: '45%',
              title: 'Documentation',
              colour: '#fdc73e',
              icon: 'archive',
              goto: 'Freight',
            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Operator Check Sheets') !== -1 ? (
        <DashboardSection
          key="section15"
          title="Operator Check Sheets"
          buttons={[
            {
              key: 'section15_button1',
              title: 'Create New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'CheckSheetsNewCrane',
              width: '29%'
            },
            {
              key: 'section15_button2',
              title: 'Pending',
              colour: '#e26139',
              icon: 'watch',
              goto: 'CheckSheetsPending',
              width: '29%'
            },
            {
              key: 'section15_button3',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'CheckSheetsSubmitted',
              width: '29%'

            },
          ]}></DashboardSection>
      ) : null}

      {props.Props.indexOf('Operator Time Sheets') !== -1 ? (
        <DashboardSection
          key="section4"
          title="Operator Time Sheets"
          buttons={[
            {
              key: 'section4_button1',
              title: 'Create New',
              colour: '#fdc73e',
              icon: 'plus-circle',
              goto: 'TimeSheetsOperatorCranes',
              width: '29%'
            },
            {
              key: 'section4_button2',
              title: 'Pending',
              colour: '#e26139',
              icon: 'watch',
              goto: 'TimeSheetsOperationPending',
              width: '29%'
            },
            {
              key: 'section16_button3',
              title: 'Submitted',
              colour: '#489b1a',
              icon: 'check-circle',
              goto: 'TimeSheetsOperationSubmitted',
              width: '29%'
            },
          ]}></DashboardSection>
      ) : null}

      <DashboardSection
        key="section17"
        title="Extra Links"
        buttons={[
          {
            key: 'section17_button1',
            title: 'Address Book',
            colour: '#fdc73e',
            icon: 'book-open',
            goto: 'AddressBook',
            width: '29%'
          },
          {
            key: 'section17_button1',
            title: 'Password',
            colour: '#fdc73e',
            icon: 'key',
            goto: 'PasswordReset',
            width: '29%'
          },                    
          {
            key: 'section17_button1',
            title: 'Links',
            colour: '#fdc73e',
            icon: 'align-justify',
            goto: 'HamburgerLinks',
            width: '29%'
          },
        ]}></DashboardSection>

      <View style={{marginBottom: 30}}></View>
    </>
  );
};

export default DashboardEmployee;
