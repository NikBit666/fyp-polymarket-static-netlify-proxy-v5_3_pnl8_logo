import { Header } from './Header.js'
import { WalletInput } from './WalletInput.js'
import { ProfileCard } from './ProfileCard.js'
import { FiltersCard } from './FiltersCard.js'
import { MarketFeed } from './MarketFeed.js'
import { StatusBar } from './StatusBar.js'
import { initializeApp } from '../services/appService.js'

export function App() {
  setTimeout(() => {
    initializeApp()
  }, 0)

  return `
    <div class="app">
      ${Header()}
      
      <main class="container">
        <div class="grid grid-3">
          <!-- Left Column -->
          <div class="sidebar">
            ${WalletInput()}
            ${ProfileCard()}
            ${FiltersCard()}
            
            <div class="card">
              <h3 class="font-semibold mb-2">About</h3>
              <p class="text-sm text-muted">
                This is a read-only demo that shows personalized market recommendations 
                based on trading patterns. Uses sample data for demonstration purposes.
              </p>
            </div>
          </div>
          
          <!-- Right Column -->
          <div class="main-content" style="grid-column: span 2;">
            ${StatusBar()}
            ${MarketFeed()}
          </div>
        </div>
      </main>
    </div>
  `
}