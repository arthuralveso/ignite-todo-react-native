import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import edit from '../assets/icons/edit/edit.png';
import trashIcon from '../assets/icons/trash/trash.png';
import { Task } from './TasksList';

export interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  editTask,
  removeTask,
}: TaskItemProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEdited(!isEdited);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEdited(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setIsEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEdited]);

  return (
    <View style={styles.majorContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>

        <TextInput
          value={taskTitle}
          onChangeText={setTaskTitle}
          editable={isEdited}
          onSubmitEditing={handleSubmitEditing}
          ref={textInputRef}
          style={task.done ? styles.taskTextDone : styles.taskText}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        {isEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={edit} style={{ tintColor: '#355cb1cf' }} />
          </TouchableOpacity>
        )}

        <View style={styles.iconDivider} />

        <TouchableOpacity
          disabled={isEdited}
          onPress={() => removeTask(task.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isEdited ? 0.2 : 1, tintColor: '#b13535cf' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  majorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: 30,
  },
  iconDivider: {
    width: 1,
    height: 15,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 10,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 5,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
});
