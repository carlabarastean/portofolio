# Images Folder

Place your hero section photos here.

## How to add your images:

1. Add your photos to this folder (`src/assets/images/`)
   - Recommended format: JPG or PNG
   - Recommended size: 400x400px or larger (square images work best)
   - Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg` (or use any names you prefer)

2. Update `src/App.tsx`:
   - Uncomment the import statements at the top
   - Replace the placeholder URLs with your imported images

Example:
```typescript
import photo1 from './assets/images/photo1.jpg'
import photo2 from './assets/images/photo2.jpg'
import photo3 from './assets/images/photo3.jpg'

const heroImages = [photo1, photo2, photo3]
```

The images will be automatically optimized by Vite during the build process.


