import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';

const INITIAL_MESSAGES = [
  {
    id: '1',
    sender: 'user',
    text: "What's the status on the Johnson transaction?",
    time: '10:14 AM',
  },
  {
    id: '2',
    sender: 'judy',
    text: "The Johnson deal at 4521 Oak Street is on track. Inspection was completed yesterday — no major issues found. Appraisal is scheduled for Thursday. Close date is October 18. Do you want me to send the buyers an update?",
    time: '10:14 AM',
  },
  {
    id: '3',
    sender: 'user',
    text: 'Yes please send them an update',
    time: '10:15 AM',
  },
  {
    id: '4',
    sender: 'judy',
    text: "Done! I sent Sarah and Mike Johnson an email update with the full timeline. They'll see it within the next few minutes. Anything else you need?",
    time: '10:15 AM',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = {
      id: String(Date.now()),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const judyReply = {
        id: String(Date.now() + 1),
        sender: 'judy',
        text: "Got it! I'm on it. I'll take care of that right away and let you know when it's done. Anything else you'd like me to handle?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, judyReply]);
    }, 1800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarEmoji}>🤖</Text>
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.judyName}>Judy</Text>
          <Text style={styles.judyStatus}>Online · AI Assistant</Text>
        </View>
        <TouchableOpacity style={styles.infoBtn}>
          <Text style={styles.infoBtnText}>ℹ️</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeText}>Today</Text>
        </View>

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.sender === 'user' ? styles.messageRowUser : styles.messageRowJudy,
            ]}
          >
            {msg.sender === 'judy' && (
              <View style={styles.judyAvatar}>
                <Text style={{ fontSize: 14 }}>J</Text>
              </View>
            )}
            <View
              style={[
                styles.bubble,
                msg.sender === 'user' ? styles.userBubble : styles.judyBubble,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  msg.sender === 'user' ? styles.userBubbleText : styles.judyBubbleText,
                ]}
              >
                {msg.text}
              </Text>
              <Text style={styles.timeText}>{msg.time}</Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageRow, styles.messageRowJudy]}>
            <View style={styles.judyAvatar}>
              <Text style={{ fontSize: 14 }}>J</Text>
            </View>
            <View style={[styles.bubble, styles.judyBubble, styles.typingBubble]}>
              <Text style={styles.typingText}>Judy is thinking...</Text>
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, { opacity: 1 }]} />
                <View style={[styles.typingDot, { opacity: 0.6 }]} />
                <View style={[styles.typingDot, { opacity: 0.3 }]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask Judy anything..."
          placeholderTextColor={colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : null]}
          onPress={sendMessage}
          activeOpacity={0.8}
        >
          <Text style={styles.sendBtnText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent + '22',
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.card,
  },
  headerText: {
    flex: 1,
  },
  judyName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  judyStatus: {
    fontSize: 12,
    color: colors.success,
  },
  infoBtn: {
    padding: 8,
  },
  infoBtnText: {
    fontSize: 20,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
    paddingBottom: 8,
  },
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateBadgeText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowJudy: {
    justifyContent: 'flex-start',
  },
  judyAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: colors.accent,
    borderBottomRightRadius: 4,
  },
  judyBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userBubbleText: {
    color: '#000',
    fontWeight: '500',
  },
  judyBubbleText: {
    color: colors.textPrimary,
  },
  timeText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
    textAlign: 'right',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  typingText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: colors.accent,
  },
  sendBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});
