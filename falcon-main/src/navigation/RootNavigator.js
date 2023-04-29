import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useUserStore} from '../store';
import {
  Login,
  Dashboard,
  Contacts,
  SiteRecords,
  SiteRecordsView,
  SiteRecordsViewSkills,
  Stats,
  Anemoi,
  Document,
  Snapshots,
  OrderFormsNew,
  OrderFormsNewDetails,
  OrderFormsNewSignature,
  OrderFormsCompleted,
  WorkInstructionsCreateNew,
  WorkInstructionsCreateNewForm,
  WorkInstructionsCreateNewSignature,
  WorkInstructionsSubmitted,
  Rams,
  RamsView,
  TimeSheetsField,
  TimeSheetField,
  TimeSheetsFieldPending,
  TimeSheetsFieldSubmitted,
  TimeSheetFieldSubmit,
  TimeSheetFieldComments,
  TimeSheetFieldCommentAdd,
  AntiCollisionSignOffSheet,
  AntiCollisionSignOffSheetForm,
  AntiCollisionSignOffSheetSubmitted,
  Policies,
  Personnel,
  BulletinsCompleted,
  BulletinsNew,
  BulletinsSign,
  SlewRingBoltSheet,
  SlewRingBoltSheetForm,
  SlewRingBoltSheetSubmitted,
  LoadTestCertificateSubmitted,
  LoadTestCertificate,
  LoadTestCertificateForm,
  ServiceWorksheetSubmitted,
  ServiceWorksheet,
  ServiceWorksheetForm,
  ServiceWorksheetMissing,
  PostOperationSubmitted,
  PostOperation,
  PostOperationForm,
  YardLoading,
  YardScan,
  YardBarcoding,
  YardAsset,
  YardAssetEdit,
  YardAssetNDT,
  YardSprayShopWorksheet,
  YardFabricationWorksheet,
  HolidayRequest,
  HolidaySummary,
  HolidaySummaryDetails,
  Freight,
  DocumentViewer,
  TimeSheetsOperatorCranes,
  TimeSheetsOperation,
  TimeSheetOperation,
  TimeSheetsOperationPending,
  TimeSheetsOperationSubmitted,
  TimeSheetOperationSubmit,
  TimeSheetOperationComments,
  TimeSheetOperationCommentAdd,
  TimeSheetOperatorHirer,
  CheckSheetsNewCrane,
  CheckSheetsSubmitted,
  CheckSheetsNewWeek,
  CheckSheet,
  PasswordReset,
  CheckSheetsPending,
  CheckSheetSubmit,
  CheckSheetsComments,
  CheckSheetsCommentAdd,
  CheckSheetDay,
  HamburgerLinks,
  AddressBook,
  ContactUs,
  Documents,
  SprayBooth,
  CraneCalculator,
  PDFviewer,
  SaddleCranes,
  LuffingCranes,
  SelfErecting,
  TruckMounted,
  PowerGeneration,
  RamsComments,
  RamsCommentAdd,
  RamsAmendmentAdd,
  ManageCrew,
  ManageCrewAdd,
  RamsSignatureSign,
  RamsSignatureComments,
  RamsSignatureCommentAdd,
  RiskAssessments,
  RiskAssessmentView
} from '../features';
import {Image, TouchableOpacity, View, Text, Alert} from 'react-native';
import {colours, font} from '../config';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const logMeOut = () => {
  useUserStore.getState().logUserOut();
};

const Navigation = () => {
  const User = useUserStore();
  let userType;
  if (User.me) {
    if (User.me.customerID > 0) {
      userType = 'Customer';
    }
    if (User.me.employeeType > 0) {
      if (User.me.employeeType == 1) {
        userType = 'Service Field';
      } else if (User.me.employeeType == 2) {
        userType = 'Falcon Operator';
      } else if (User.me.employeeType == 3) {
        userType = 'Site Own Operator';
      } else if (User.me.employeeType == 4) {
        userType = 'Banksman / Supervisor';
      } else if (User.me.employeeType == 5) {
        userType = 'Truck Driver';
      } else if (User.me.employeeType == 6) {
        userType = 'Yard Employee';
      } else if (User.me.employeeType == 7) {
        userType = 'Admin Staffx';
      } else if (User.me.employeeType == 8) {
        userType = 'E&D Field';
      } else if (User.me.employeeType == 9) {
        userType = 'Generator Staff';
      }
    }
  }

  let screenOptions;

  const notLoggedInHeader = {
    headerShown: false,
  };

  const loggedInHeader = {
    headerRight: () => (
      <TouchableOpacity onPress={logMeOut}>
        <Text
          style={{
            color: 'white',
            borderColor: 'white',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    ),
    headerBackTitleVisible: true,
    headerStyle: {
      backgroundColor: '#222c33',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  function loggedInHeaderFunction(customHeader) {
    return {
      headerRight: () => (
        <TouchableOpacity onPress={logMeOut}>
          <Text
            style={{
              color: 'white',
              borderColor: 'white',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      ),
      headerBackTitleVisible: true,
      headerStyle: {
        backgroundColor: '#222c33',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: customHeader,
    };
  }

  function loggedOutHeaderFunction(customHeader) {
    return {
      headerBackTitleVisible: true,
      headerStyle: {
        backgroundColor: '#222c33',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: customHeader,
    };
  }  

  function loggedInHeaderFunctionDocument(customHeader) {
    return {
      headerBackTitleVisible: true,
      headerStyle: {
        backgroundColor: '#222c33',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: customHeader,
    };
  }

  const loggedInHeaderDashboard = {
    headerTitle: props => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
        <Image
          style={{
            align: 'left',
            width: 50,
            height: 40,
          }}
          source={require('../assets/images/header-logo-black-eye.png')}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Fira Sans Condensed',
            }}>
            {User.me.name}
          </Text>
          <Text style={{color: 'white', fontFamily: 'Fira Sans Condensed'}}>
            {userType}
          </Text>
        </View>
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={logMeOut}>
        <Text
          style={{
            color: 'white',
            borderColor: 'white',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: '#222c33',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  const MyTheme = !User.isLoggedIn
    ? {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: 'rgb(255, 45, 85)',
          background: '#1d2629',
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
        },
      };

  return (
    <NavigationContainer theme={MyTheme}>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>       */}
      <Stack.Navigator screenOptions={screenOptions}>
        {User.isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={loggedInHeaderDashboard}
            />
            <Stack.Screen
              name="SiteRecords"
              component={SiteRecords}
              options={loggedInHeaderFunction('Choose Site')}
            />
            <Stack.Screen
              name="SiteRecordsView"
              component={SiteRecordsView}
              options={loggedInHeaderFunction('Choose Document')}
            />
            <Stack.Screen
              name="SiteRecordsViewSkills"
              component={SiteRecordsViewSkills}
              options={loggedInHeaderFunction('Crew Skills')}
            />
            <Stack.Screen
              name="Contacts"
              component={Contacts}
              options={loggedInHeaderFunction('Contacts')}
            />
            <Stack.Screen
              name="Stats"
              component={Stats}
              options={loggedInHeaderFunction('Stats')}
            />
            <Stack.Screen
              name="Anemoi"
              component={Anemoi}
              options={loggedInHeaderFunction('Anemoi')}
            />
            <Stack.Screen
              name="Document"
              component={Document}
              options={loggedInHeaderFunctionDocument('View Document')}
            />
            <Stack.Screen
              name="Snapshots"
              component={Snapshots}
              options={loggedInHeaderFunction('Snapshots')}
            />
            <Stack.Screen
              name="OrderFormsNew"
              component={OrderFormsNew}
              options={loggedInHeaderFunction('New Order')}
            />
            <Stack.Screen
              name="OrderFormsNewDetails"
              component={OrderFormsNewDetails}
              options={loggedInHeaderFunction('Details')}
            />
            <Stack.Screen
              name="OrderFormsNewSignature"
              component={OrderFormsNewSignature}
              options={loggedInHeaderFunction('Signature')}
            />
            <Stack.Screen
              name="OrderFormsCompleted"
              component={OrderFormsCompleted}
              options={loggedInHeaderFunction('Completed')}
            />
            <Stack.Screen
              name="WorkInstructionsCreateNew"
              component={WorkInstructionsCreateNew}
              options={loggedInHeaderFunction('Select A Crane')}
            />
            <Stack.Screen
              name="Rams"
              component={Rams}
              options={loggedInHeaderFunction('RAMS')}
            />
            <Stack.Screen
              name="RamsView"
              component={RamsView}
              options={loggedInHeaderFunction('Documents')}
            />
            <Stack.Screen
              name="WorkInstructionsCreateNewForm"
              component={WorkInstructionsCreateNewForm}
              options={loggedInHeaderFunction('Details')}
            />
            <Stack.Screen
              name="WorkInstructionsCreateNewSignature"
              component={WorkInstructionsCreateNewSignature}
              options={loggedInHeaderFunction('Signature')}
            />
            <Stack.Screen
              name="WorkInstructionsSubmitted"
              component={WorkInstructionsSubmitted}
              options={loggedInHeaderFunction('Work Instructions')}
            />
            <Stack.Screen
              name="TimeSheetsField"
              component={TimeSheetsField}
              options={loggedInHeaderFunction('Select A Week')}
            />
            <Stack.Screen
              name="TimeSheetField"
              component={TimeSheetField}
              options={loggedInHeaderFunction('Time Sheet Field')}
            />
            <Stack.Screen
              name="TimeSheetsFieldPending"
              component={TimeSheetsFieldPending}
              options={loggedInHeaderFunction('Pending Time Sheets')}
            />
            <Stack.Screen
              name="TimeSheetsFieldSubmitted"
              component={TimeSheetsFieldSubmitted}
              options={loggedInHeaderFunction('Completed Time Sheets')}
            />
            <Stack.Screen
              name="TimeSheetFieldSubmit"
              component={TimeSheetFieldSubmit}
              options={loggedInHeaderFunction('Submit Time Sheet')}
            />
            <Stack.Screen
              name="TimeSheetFieldComments"
              component={TimeSheetFieldComments}
              options={loggedInHeaderFunction('Comments')}
            />
            <Stack.Screen
              name="TimeSheetFieldCommentAdd"
              component={TimeSheetFieldCommentAdd}
              options={loggedInHeaderFunction('Add Comment')}
            />
            <Stack.Screen
              name="AntiCollisionSignOffSheet"
              component={AntiCollisionSignOffSheet}
              options={loggedInHeaderFunction('Select A Crane')}
            />
            <Stack.Screen
              name="AntiCollisionSignOffSheetForm"
              component={AntiCollisionSignOffSheetForm}
              options={loggedInHeaderFunction('Enter Details')}
            />
            <Stack.Screen
              name="Policies"
              component={Policies}
              options={loggedInHeaderFunction('Company Policies')}
            />
            <Stack.Screen
              name="Personnel"
              component={Personnel}
              options={loggedInHeaderFunction('Personnel Files')}
            />
            <Stack.Screen
              name="BulletinsCompleted"
              component={BulletinsCompleted}
              options={loggedInHeaderFunction('Completed Bulletins')}
            />
            <Stack.Screen
              name="BulletinsNew"
              component={BulletinsNew}
              options={loggedInHeaderFunction('New Bulletins')}
            />
            <Stack.Screen
              name="BulletinsSign"
              component={BulletinsSign}
              options={loggedInHeaderFunction('Sign Bulletin')}
            />
            <Stack.Screen
              name="YardLoading"
              component={YardLoading}
              options={loggedInHeaderFunction('Yard Loading')}
            />
            <Stack.Screen
              name="YardScan"
              component={YardScan}
              options={loggedInHeaderFunction('Yard Scan')}
            />
            <Stack.Screen
              name="YardBarcoding"
              component={YardBarcoding}
              options={loggedInHeaderFunction('Yard Barcoding')}
            />
            <Stack.Screen
              name="YardAsset"
              component={YardAsset}
              options={loggedInHeaderFunction('View Component')}
            />
            <Stack.Screen
              name="YardAssetEdit"
              component={YardAssetEdit}
              options={loggedInHeaderFunction('Manage Component')}
            />
            <Stack.Screen
              name="YardAssetNDT"
              component={YardAssetNDT}
              options={loggedInHeaderFunction('NDT Testing')}
            />
            <Stack.Screen
              name="YardSprayShopWorksheet"
              component={YardSprayShopWorksheet}
              options={loggedInHeaderFunction('Spray Shop')}
            />
            <Stack.Screen
              name="YardFabricationWorksheet"
              component={YardFabricationWorksheet}
              options={loggedInHeaderFunction('Fabrication')}
            />
            <Stack.Screen
              name="SlewRingBoltSheet"
              component={SlewRingBoltSheet}
              options={loggedInHeaderFunction('Select A Crane')}
            />
            <Stack.Screen
              name="SlewRingBoltSheetForm"
              component={SlewRingBoltSheetForm}
              options={loggedInHeaderFunction('Enter Details')}
            />
            <Stack.Screen
              name="SlewRingBoltSheetSubmitted"
              component={SlewRingBoltSheetSubmitted}
              options={loggedInHeaderFunction('Slew Ring')}
            />
            <Stack.Screen
              name="LoadTestCertificateSubmitted"
              component={LoadTestCertificateSubmitted}
              options={loggedInHeaderFunction('Load Certificate')}
            />
            <Stack.Screen
              name="AntiCollisionSignOffSheetSubmitted"
              component={AntiCollisionSignOffSheetSubmitted}
              options={loggedInHeaderFunction('Anti Collision')}
            />
            <Stack.Screen
              name="LoadTestCertificate"
              component={LoadTestCertificate}
              options={loggedInHeaderFunction('Select a Crane')}
            />
            <Stack.Screen
              name="LoadTestCertificateForm"
              component={LoadTestCertificateForm}
              options={loggedInHeaderFunction('Enter Details')}
            />
            <Stack.Screen
              name="ServiceWorksheetSubmitted"
              component={ServiceWorksheetSubmitted}
              options={loggedInHeaderFunction('Service Worksheet')}
            />
            <Stack.Screen
              name="ServiceWorksheet"
              component={ServiceWorksheet}
              options={loggedInHeaderFunction('Select a Crane')}
            />
            <Stack.Screen
              name="ServiceWorksheetForm"
              component={ServiceWorksheetForm}
              options={loggedInHeaderFunction('Enter Details')}
            />
            <Stack.Screen
              name="ServiceWorksheetMissing"
              component={ServiceWorksheetMissing}
              options={loggedInHeaderFunction('Enter Details')}
            />
            <Stack.Screen
              name="PostOperationSubmitted"
              component={PostOperationSubmitted}
              options={loggedInHeaderFunction('Post Operation')}
            />
            <Stack.Screen
              name="PostOperation"
              component={PostOperation}
              options={loggedInHeaderFunction('Select a Crane')}
            />
            <Stack.Screen
              name="PostOperationForm"
              component={PostOperationForm}
              options={loggedInHeaderFunction('Enter Details')}
            />
            <Stack.Screen
              name="HolidayRequest"
              component={HolidayRequest}
              options={loggedInHeaderFunction('Holiday Request')}
            />
            <Stack.Screen
              name="HolidaySummary"
              component={HolidaySummary}
              options={loggedInHeaderFunction('Holiday Summary')}
            />
            <Stack.Screen
              name="HolidaySummaryDetails"
              component={HolidaySummaryDetails}
              options={loggedInHeaderFunction('Details')}
            />
            <Stack.Screen
              name="Freight"
              component={Freight}
              options={loggedInHeaderFunction('Freight')}
            />
            <Stack.Screen
              name="DocumentViewer"
              component={DocumentViewer}
              options={loggedInHeaderFunction('Document')}
            />
            <Stack.Screen
              name="TimeSheetsOperatorCranes"
              component={TimeSheetsOperatorCranes}
              options={loggedInHeaderFunction('Select A Crane')}
            />
            <Stack.Screen
              name="TimeSheetsOperation"
              component={TimeSheetsOperation}
              options={loggedInHeaderFunction('Select A Week')}
            />
            <Stack.Screen
              name="TimeSheetOperation"
              component={TimeSheetOperation}
              options={loggedInHeaderFunction('Time Sheet Operation')}
            />
            <Stack.Screen
              name="TimeSheetsOperationPending"
              component={TimeSheetsOperationPending}
              options={loggedInHeaderFunction('Pending Time Sheets')}
            />
            <Stack.Screen
              name="TimeSheetsOperationSubmitted"
              component={TimeSheetsOperationSubmitted}
              options={loggedInHeaderFunction('Submitted Time Sheets')}
            />
            <Stack.Screen
              name="TimeSheetOperationSubmit"
              component={TimeSheetOperationSubmit}
              options={loggedInHeaderFunction('Submit Time Sheet')}
            />
            <Stack.Screen
              name="TimeSheetOperationComments"
              component={TimeSheetOperationComments}
              options={loggedInHeaderFunction('Comments')}
            />
            <Stack.Screen
              name="TimeSheetOperationCommentAdd"
              component={TimeSheetOperationCommentAdd}
              options={loggedInHeaderFunction('Add comment')}
            />
            <Stack.Screen
              name="CheckSheetsNewCrane"
              component={CheckSheetsNewCrane}
              options={loggedInHeaderFunction('Select Crane')}
            />
            <Stack.Screen
              name="CheckSheetsSubmitted"
              component={CheckSheetsSubmitted}
              options={loggedInHeaderFunction('Submitted Check Sheets')}
            />
            <Stack.Screen
              name="CheckSheetsNewWeek"
              component={CheckSheetsNewWeek}
              options={loggedInHeaderFunction('Select A Week')}
            />
            <Stack.Screen
              name="CheckSheet"
              component={CheckSheet}
              options={loggedInHeaderFunction('Check Sheet Form')}
            />
            <Stack.Screen
              name="PasswordReset"
              component={PasswordReset}
              options={loggedInHeaderFunction('Reset your password')}
            />
            <Stack.Screen
              name="CheckSheetsPending"
              component={CheckSheetsPending}
              options={loggedInHeaderFunction('Pending check sheets')}
            />
            <Stack.Screen
              name="CheckSheetSubmit"
              component={CheckSheetSubmit}
              options={loggedInHeaderFunction('Submit check sheets')}
            />
            <Stack.Screen
              name="CheckSheetsComments"
              component={CheckSheetsComments}
              options={loggedInHeaderFunction('Comments')}
            />
            <Stack.Screen
              name="CheckSheetsCommentAdd"
              component={CheckSheetsCommentAdd}
              options={loggedInHeaderFunction('Add comment')}
            />
            <Stack.Screen
              name="CheckSheetDay"
              component={CheckSheetDay}
              options={loggedInHeaderFunction('Make changes')}
            />
            <Stack.Screen
              name="TimeSheetOperatorHirer"
              component={TimeSheetOperatorHirer}
              options={loggedInHeaderFunction('Hirer approval')}
            />
            <Stack.Screen
              name="HamburgerLinks"
              component={HamburgerLinks}
              options={loggedInHeaderFunction('Links')}
            />
            <Stack.Screen
              name="AddressBook"
              component={AddressBook}
              options={loggedInHeaderFunction('Address Book')}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={loggedInHeaderFunction('Contact Us')}
            />
            <Stack.Screen
              name="Documents"
              component={Documents}
              options={loggedInHeaderFunction('Documents')}
            />
            <Stack.Screen
              name="SprayBooth"
              component={SprayBooth}
              options={loggedInHeaderFunction('Spray Booth')}
            />
            <Stack.Screen
              name="CraneCalculator"
              component={CraneCalculator}
              options={loggedInHeaderFunction('Crane Calculator')}
            />
            <Stack.Screen
              name="PDFviewer"
              component={PDFviewer}
              options={loggedInHeaderFunction('PDF')}
            />
            <Stack.Screen
              name="SaddleCranes"
              component={SaddleCranes}
              options={loggedInHeaderFunction('Saddle Cranes')}
            />
            <Stack.Screen
              name="LuffingCranes"
              component={LuffingCranes}
              options={loggedInHeaderFunction('Luffing Cranes')}
            />
            <Stack.Screen
              name="SelfErecting"
              component={SelfErecting}
              options={loggedInHeaderFunction('Self Erecting Cranes')}
            />
            <Stack.Screen
              name="TruckMounted"
              component={TruckMounted}
              options={loggedInHeaderFunction('Truck Mounted Cranes')}
            />
            <Stack.Screen
              name="PowerGeneration"
              component={PowerGeneration}
              options={loggedInHeaderFunction('Power Generation')}
            />
            <Stack.Screen
              name="RamsComments"
              component={RamsComments}
              options={loggedInHeaderFunction('Comments')}
            />
            <Stack.Screen
              name="RamsCommentAdd"
              component={RamsCommentAdd}
              options={loggedInHeaderFunction('Add Comment')}
            />
            <Stack.Screen
              name="RamsAmendmentAdd"
              component={RamsAmendmentAdd}
              options={loggedInHeaderFunction('Add Amendment')}
            />
            <Stack.Screen
              name="ManageCrew"
              component={ManageCrew}
              options={loggedInHeaderFunction('Manage Crew')}
            />
            <Stack.Screen
              name="ManageCrewAdd"
              component={ManageCrewAdd}
              options={loggedInHeaderFunction('Add Crew')}
            />
            <Stack.Screen
              name="RamsSignatureSign"
              component={RamsSignatureSign}
              options={loggedInHeaderFunction('Your Signature')}
            />
            <Stack.Screen
              name="RamsSignatureComments"
              component={RamsSignatureComments}
              options={loggedInHeaderFunction('Comments')}
            />
            <Stack.Screen
              name="RamsSignatureCommentAdd"
              component={RamsSignatureCommentAdd}
              options={loggedInHeaderFunction('Add Comment')}
            />
            <Stack.Screen
              name="RiskAssessments"
              component={RiskAssessments}
              options={loggedInHeaderFunction('Risk Assessments')}
            />
            <Stack.Screen
              name="RiskAssessmentView"
              component={RiskAssessmentView}
              options={loggedInHeaderFunction('Risk Assessment')}
            />




          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={notLoggedInHeader}
            />
            <Stack.Screen
              name="CraneCalculator"
              component={CraneCalculator}
              options={loggedOutHeaderFunction('Crane Calculator')}
            />
            <Stack.Screen
              name="SaddleCranes"
              component={SaddleCranes}
              options={loggedOutHeaderFunction('Saddle Cranes')}
            />
            <Stack.Screen
              name="LuffingCranes"
              component={LuffingCranes}
              options={loggedOutHeaderFunction('Luffing Cranes')}
            />
            <Stack.Screen
              name="SelfErecting"
              component={SelfErecting}
              options={loggedOutHeaderFunction('Self Erecting Cranes')}
            />
            <Stack.Screen
              name="TruckMounted"
              component={TruckMounted}
              options={loggedOutHeaderFunction('Truck Mounted Cranes')}
            />
            <Stack.Screen
              name="PowerGeneration"
              component={PowerGeneration}
              options={loggedOutHeaderFunction('Power Generation')}
            />
            <Stack.Screen
              name="SprayBooth"
              component={SprayBooth}
              options={loggedOutHeaderFunction('Spray Booth')}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={loggedOutHeaderFunction('Contact Us')}
            />
            <Stack.Screen
              name="Documents"
              component={Documents}
              options={loggedOutHeaderFunction('Documents')}
            />
            <Stack.Screen
              name="PDFviewer"
              component={PDFviewer}
              options={loggedOutHeaderFunction('PDF')}
            />            
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
