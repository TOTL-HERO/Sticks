import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingWizard } from '../screens/onboarding/OnboardingWizard';

export type OnboardingStackParamList = {
  OnboardingWizard: { initialStep?: number };
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

interface OnboardingStackProps {
  initialStep?: number;
  onComplete: () => void;
}

export function OnboardingStack({ initialStep = 0, onComplete }: OnboardingStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#101511' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="OnboardingWizard">
        {() => <OnboardingWizard initialStep={initialStep} onComplete={onComplete} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
