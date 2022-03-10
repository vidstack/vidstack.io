export function isKeyboardEvent(event: Event): event is KeyboardEvent {
  return event.type.startsWith('key');
}

export function wasEnterKeyPressed(event: Event) {
  return isKeyboardEvent(event) && event.key === 'Enter';
}

export function wasEscapeKeyPressed(event: Event) {
  return isKeyboardEvent(event) && event.key === 'Escape';
}
