import React, {FC, useState, ReactElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  data?: any[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
  hideNumberStep?: boolean;
  parentStepStyle?: ViewStyle;
  hideContent?: boolean;
  textOnLabelStyle?: TextStyle;
  textOffLabelStyle?: TextStyle;
  parentLabelStyle?: ViewStyle;
}

const search = (keyName: number, active: number): boolean => {
  let value = false;
 
    if (active >= keyName) {
      value = true;
    }
  return value;
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
	hideNumberStep = false,
	parentStepStyle,
	hideContent = false,
	parentLabelStyle,
	textOnLabelStyle,
	textOffLabelStyle,
	data
  } = props;
  const [step, setStep] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setStep((prev) => [...prev, val]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };
  return (
    <View style={wrapperStyle}>
      <View
        style={[{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
		parentStepStyle,
		]}>
        {(data?.length >0 ? data:content).map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: search(i, active) ? '#32BFC5' : 'grey',
                    opacity: 1,
                    marginHorizontal: 10,
                  }}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: '#1976d2',
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: search(i, active) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}>
                {search(i, active) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                  {!hideNumberStep && i + 1}
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    {!hideNumberStep && i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
	  {data?.length >0 && hideContent && (
		 <View
		 style={[{
		   flexDirection: 'row',
		   alignItems: 'center',
		   justifyContent: 'space-between',
		   width: '100%',
		 },
		 parentLabelStyle,
		 ]}>
			{data.map((d, i) => (

  <View key={i} style={{width:`${Math.round(100/data?.length)}%`}}>
			  <Text style={[{textAlign: i===0? 'left':i + 1=== data?.length? 'right' :'center'},search(i , active) ? textOnLabelStyle: textOffLabelStyle]}>
			  {d?.title}
			</Text>
			</View>

			))}
			</View>
	  )}
	  {!hideContent && (
      <ScrollView showsVerticalScrollIndicator={false}>
        {content[active]}
      </ScrollView>)}
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
          }}>
          {active !== 0 && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
                {
                  backgroundColor: '#a1a1a1',
                },
              ]}
              onPress={() => {
                removeData();
                onBack();
              }}>
              <Text style={[{color: 'white'}, buttonTextStyle]}>Back</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
              ]}
              onPress={() => {
                pushData(active + 1);
                onNext();
              }}>
              <Text style={[{color: 'white'}, buttonTextStyle]}>Next</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}>
              <Text style={[{color: 'white'}, buttonTextStyle]}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;
