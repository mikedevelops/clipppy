import { mock, verify, when, instance, deepEqual } from 'ts-mockito';
import AnimationService from '../../src/services/AnimationService';
import RenderService from '../../src/services/RenderService';

jest.mock('../../src/services/RenderService');

describe('AnimationService', () => {
    let animationService: AnimationService;
    let renderService: RenderService;

    beforeEach(() => {
        renderService = mock(RenderService);
        window.requestAnimationFrame = jest.fn();
        animationService = new AnimationService(
            instance(renderService),
            window,
            [{ x: 0, y: 0 }, { x: 1, y: 0 }],
            60
        );
    });

    describe('getFrame', () => {
        test('should get frame', () => {
            expect(animationService.getFrame()).toEqual(0);
        });
    });

    describe('update', () => {
        test('should invoke the render service', () => {
            animationService.update(jest.fn());

            verify(renderService.render(deepEqual({ x: 0, y: 0 }))).called();
        });

        test('should increment the frame count', () => {
            animationService.update(jest.fn());

            expect(animationService.getFrame()).toEqual(1);
        });

        test('should invoke requestAnimationFrame', () => {
            animationService.update(jest.fn());

            expect(window.requestAnimationFrame).toHaveBeenCalled();
        });

        test('should invoke the callback if animation is complete', () => {
            const callback = jest.fn();

            animationService.update(callback);
            animationService.update(callback);
            animationService.update(callback);

            expect(callback).toBeCalled();
        });
    });

    describe('reset', () => {
        test('should ivoke the render service with the first cell', () => {
            animationService.reset();

            verify(renderService.render(deepEqual({ x: 0, y: 0 }))).called();
        });
    });
});
