import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, StyleSheet, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TopographicBackground } from '../../components/TopographicBackground';
import { useAuth } from '../../hooks/useAuth';

function AuthButton({ icon, label, bgColor, textColor, borderColor, onPress }: {
  icon: React.ReactNode; label: string; bgColor: string; textColor: string; borderColor?: string; onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
      style={{ width: '100%', height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderRadius: 4, backgroundColor: bgColor, borderWidth: borderColor ? 1 : 0, borderColor: borderColor ?? 'transparent' }}>
      {icon}
      <Text style={{ fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: textColor }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function SignUpScreen() {
  const navigation = useNavigation();
  const { signInWithGoogle, signInWithApple, signInWithEmail, signInWithPhone, verifyEmailOtp, verifyPhoneOtp } = useAuth();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authTarget, setAuthTarget] = useState('');

  const handleEmail = () => { setEmail(''); setOtp(''); setOtpSent(false); setShowEmailModal(true); };
  const handleSendEmailOtp = async () => {
    if (!email.trim()) { Alert.alert('Enter Email'); return; }
    try {
      await signInWithEmail(email.trim());
      setAuthTarget(email.trim());
      setOtpSent(true);
      Alert.alert('Check Your Email', 'We sent a verification code to ' + email.trim() + '. Enter the 6-digit code below, or click the magic link in the email.');
    } catch {}
  };
  const handleVerifyEmailOtp = async () => {
    if (!otp.trim()) return;
    try { await verifyEmailOtp(authTarget, otp.trim()); setShowEmailModal(false); } catch {}
  };
  const handlePhone = () => { setPhone(''); setOtp(''); setOtpSent(false); setShowPhoneModal(true); };
  const handleSendPhoneOtp = async () => {
    if (!phone.trim()) return;
    try { await signInWithPhone(phone.trim()); setAuthTarget(phone.trim()); setOtpSent(true); } catch {}
  };
  const handleVerifyPhoneOtp = async () => {
    if (!otp.trim()) return;
    try { await verifyPhoneOtp(authTarget, otp.trim()); setShowPhoneModal(false); } catch {}
  };

  return (
    <View style={s.root}>
      <TopographicBackground opacity={0.04} />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="close" size={24} color="#dfe4dd" /></TouchableOpacity>
          <Text style={s.headerTitle}>Join The Club</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={s.content}>
          <View style={s.branding}>
            <Text style={s.brandTitle}>Sticks</Text>
            <Text style={s.brandSub}>The Private Reserve</Text>
          </View>
          <View style={{ width: '100%', gap: 12 }}>
            <AuthButton icon={<MaterialCommunityIcons name="apple" size={20} color="#fff" />} label="Continue with Apple" bgColor="#000" textColor="#fff" borderColor="rgba(255,255,255,0.1)" onPress={signInWithApple} />
            <AuthButton icon={<MaterialCommunityIcons name="google" size={20} color="#101511" />} label="Continue with Google" bgColor="#fff" textColor="#101511" onPress={signInWithGoogle} />
            <View style={s.sep}><View style={s.sepLine} /><Text style={s.sepText}>or</Text><View style={s.sepLine} /></View>
            <AuthButton icon={<MaterialCommunityIcons name="cellphone" size={20} color="#dfe4dd" />} label="Continue with Phone" bgColor="rgba(0,56,37,0.2)" textColor="#dfe4dd" borderColor="rgba(0,56,37,0.4)" onPress={handlePhone} />
            <AuthButton icon={<MaterialCommunityIcons name="email-outline" size={20} color="#dfe4dd" />} label="Continue with Email" bgColor="rgba(0,56,37,0.2)" textColor="#dfe4dd" borderColor="rgba(0,56,37,0.4)" onPress={handleEmail} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 24, paddingBottom: 24, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Manrope', fontSize: 11, color: '#bec9c1', textAlign: 'center', opacity: 0.5 }}>
            By creating an account, you agree to our <Text style={{ color: '#dfe4dd', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://sticks.golf/terms')}>Terms</Text> and <Text style={{ color: '#dfe4dd', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://sticks.golf/privacy')}>Privacy Policy</Text>.
          </Text>
        </View>
      </SafeAreaView>
      <Modal visible={showEmailModal} animationType="slide" transparent>
        <View style={m.overlay}><View style={m.card}>
          <Text style={m.title}>{otpSent ? 'Enter Code' : 'Enter Email'}</Text>
          {!otpSent ? (<>
            <TextInput style={m.input} placeholder="you@email.com" placeholderTextColor="#88938c" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TouchableOpacity style={m.btn} onPress={handleSendEmailOtp}><Text style={m.btnText}>Send Code</Text></TouchableOpacity>
          </>) : (<>
            <Text style={m.sub}>Code sent to {authTarget}</Text>
            <TextInput style={m.input} placeholder="123456" placeholderTextColor="#88938c" value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={8} />
            <TouchableOpacity style={m.btn} onPress={handleVerifyEmailOtp}><Text style={m.btnText}>Verify</Text></TouchableOpacity>
          </>)}
          <TouchableOpacity onPress={() => setShowEmailModal(false)}><Text style={m.cancel}>Cancel</Text></TouchableOpacity>
        </View></View>
      </Modal>
      <Modal visible={showPhoneModal} animationType="slide" transparent>
        <View style={m.overlay}><View style={m.card}>
          <Text style={m.title}>{otpSent ? 'Enter Code' : 'Enter Phone'}</Text>
          {!otpSent ? (<>
            <TextInput style={m.input} placeholder="+1 555 123 4567" placeholderTextColor="#88938c" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <TouchableOpacity style={m.btn} onPress={handleSendPhoneOtp}><Text style={m.btnText}>Send Code</Text></TouchableOpacity>
          </>) : (<>
            <Text style={m.sub}>Code sent to {authTarget}</Text>
            <TextInput style={m.input} placeholder="123456" placeholderTextColor="#88938c" value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={6} />
            <TouchableOpacity style={m.btn} onPress={handleVerifyPhoneOtp}><Text style={m.btnText}>Verify</Text></TouchableOpacity>
          </>)}
          <TouchableOpacity onPress={() => setShowPhoneModal(false)}><Text style={m.cancel}>Cancel</Text></TouchableOpacity>
        </View></View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#101511' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontFamily: 'Newsreader', fontSize: 18, fontStyle: 'italic', color: '#dfe4dd', letterSpacing: 2 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  branding: { marginBottom: 48, alignItems: 'center' },
  brandTitle: { fontFamily: 'Newsreader', fontSize: 56, fontStyle: 'italic', color: '#dfe4dd', letterSpacing: -1 },
  brandSub: { fontFamily: 'Manrope', fontSize: 10, color: '#bec9c1', letterSpacing: 4, textTransform: 'uppercase', fontWeight: '500', opacity: 0.6 },
  sep: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 16 },
  sepLine: { flex: 1, height: 1, backgroundColor: '#3f4943', opacity: 0.2 },
  sepText: { fontFamily: 'Manrope', fontSize: 10, color: '#bec9c1', letterSpacing: 3, textTransform: 'uppercase', opacity: 0.5 },
});

const m = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { backgroundColor: '#1c211c', borderRadius: 16, padding: 24, width: '100%', maxWidth: 360, gap: 16 },
  title: { fontFamily: 'Newsreader', fontSize: 24, fontStyle: 'italic', color: '#dfe4dd', textAlign: 'center' },
  sub: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', textAlign: 'center' },
  input: { backgroundColor: '#101511', borderWidth: 1, borderColor: '#3f4943', borderRadius: 8, padding: 16, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 16, textAlign: 'center' },
  btn: { backgroundColor: '#006747', borderRadius: 8, padding: 16, alignItems: 'center' },
  btnText: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '700', color: '#84d7af', textTransform: 'uppercase', letterSpacing: 2 },
  cancel: { fontFamily: 'Manrope', fontSize: 14, color: '#88938c', textAlign: 'center', marginTop: 4 },
});
