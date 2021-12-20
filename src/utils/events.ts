export type GlobalEventHandlerMap = {
	[EventType in keyof GlobalEventHandlersEventMap]?: (
		event: GlobalEventHandlersEventMap[EventType],
	) => void | Promise<void>;
};

export function listen<EventType extends keyof GlobalEventHandlerMap>(
	target: EventTarget,
	type: EventType,
	listener: GlobalEventHandlerMap[EventType],
	options?: boolean | EventListenerOptions | AddEventListenerOptions,
): () => void {
	target.addEventListener(type, listener as EventListener, options);
	return () => {
		target.removeEventListener(type, listener as EventListener, options);
	};
}
